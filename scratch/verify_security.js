import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9237',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9237/json/new', { method: 'PUT' })
    const data = await res.json()
    const ws = new WebSocket(data.webSocketDebuggerUrl)
    await new Promise((resolve) => {
      if (ws.readyState === 1) return resolve();
      ws.addEventListener('open', resolve, { once: true });
    })

    let id = 1
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++
        const handler = (evt) => {
          const msg = JSON.parse(evt.data)
          if (msg.id === msgId) {
            ws.removeEventListener('message', handler)
            resolve(msg.result)
          }
        }
        ws.addEventListener('message', handler)
        ws.send(JSON.stringify({ id: msgId, method, params }))
      })
    }

    await send('Page.enable')
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })

    // 1. Test unauthenticated access (Must redirect to Login)
    await send('Page.navigate', { url: 'http://localhost:5175/admin' })
    await new Promise(r => setTimeout(r, 1200))

    await send('Runtime.evaluate', {
      expression: `
        localStorage.clear();
        window.location.reload();
      `
    })
    await new Promise(r => setTimeout(r, 1500))

    const loginCheck = await send('Runtime.evaluate', {
      expression: `Boolean(document.querySelector('form button[type="submit"]'))`
    })
    console.log('1. Unauthenticated correctly redirects to Login:', loginCheck.value)

    // 2. Set an active session and reload (Must show dashboard with prominent Sign Out button)
    await send('Runtime.evaluate', {
      expression: `
        localStorage.setItem('lionorca_founder_active_session', JSON.stringify({
          session: { access_token: 'valid_test_token' },
          user: { email: 'founder@lionorca.com', name: 'Akshay Jadaun' }
        }));
        window.location.reload();
      `
    })
    await new Promise(r => setTimeout(r, 1500))

    const sidebarShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-signout-preview.png', Buffer.from(sidebarShot.data, 'base64'))
    console.log('2. Captured dashboard with visible Sign Out button: public/admin-signout-preview.png')

    // 3. Test clicking "Sign Out"
    const signoutResult = await send('Runtime.evaluate', {
      expression: `
        const buttons = Array.from(document.querySelectorAll('aside button'));
        const signoutBtn = buttons.find(b => b.textContent.includes('Sign Out'));
        if (signoutBtn) {
          signoutBtn.click();
          true;
        } else {
          false;
        }
      `
    })
    console.log('3. Found and clicked Sign Out button:', signoutResult.value)

    await new Promise(r => setTimeout(r, 1200))

    const postSignoutCheck = await send('Runtime.evaluate', {
      expression: `Boolean(document.querySelector('form button[type="submit"]'))`
    })
    console.log('4. App locked down, redirected to Login:', postSignoutCheck.value)

    const postSignoutShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-locked-login-preview.png', Buffer.from(postSignoutShot.data, 'base64'))
    console.log('5. Saved post-signout locked screen: public/admin-locked-login-preview.png')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Test error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1200)

