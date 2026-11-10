import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9235',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9235/json/new', { method: 'PUT' })
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

    // Navigate to admin
    await send('Page.navigate', { url: 'http://localhost:5175/admin' })
    await new Promise(r => setTimeout(r, 1200))

    // Clear any previous session
    await send('Runtime.evaluate', {
      expression: `
        localStorage.removeItem('lionorca_founder_active_session');
        window.location.reload();
      `
    })
    await new Promise(r => setTimeout(r, 1500))

    // Capture clean login screen
    const loginShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-login-preview.png', Buffer.from(loginShot.data, 'base64'))
    console.log('1. Captured clean login screen')

    // Fill form and click Sign In to test that NO red error appears
    await send('Runtime.evaluate', {
      expression: `
        const emailInput = document.getElementById('email');
        const passInput = document.getElementById('password');
        const form = document.querySelector('form');
        if (emailInput) {
          emailInput.value = 'founder@lionorca.com';
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (passInput) {
          passInput.value = 'mypassword123';
          passInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      `
    })

    await new Promise(r => setTimeout(r, 1800))

    // Capture the logged-in dashboard!
    const dashShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-architects-preview.png', Buffer.from(dashShot.data, 'base64'))
    console.log('2. Successfully signed in and captured dashboard!')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Test error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1200)
