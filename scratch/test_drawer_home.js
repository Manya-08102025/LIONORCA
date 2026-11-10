import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9226',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9226/json/new', { method: 'PUT' })
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
    await send('DOM.enable')
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })

    // Navigate to /work-with-us
    await send('Page.navigate', { url: 'http://localhost:5173/work-with-us?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    // Open drawer
    await send('Runtime.evaluate', {
      expression: `
        const menuBtn = document.querySelector('button[aria-label="Open Navigation Menu"]');
        if (menuBtn) menuBtn.click();
      `
    })
    await new Promise((r) => setTimeout(r, 600))

    // Screenshot open drawer
    const { data: drawerShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-drawer-with-home.png', Buffer.from(drawerShot, 'base64'))

    // Now test clicking Home item
    const clickRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const homeLink = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Home');
          if (homeLink) {
            homeLink.click();
            return { clicked: true, pathname: window.location.pathname };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true,
    })
    console.log('Click home result:', clickRes.result.value)

    await new Promise((r) => setTimeout(r, 800))
    const pathAfter = await send('Runtime.evaluate', {
      expression: 'window.location.pathname',
      returnByValue: true,
    })
    console.log('Pathname after clicking Home:', pathAfter.result.value)

    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error during test:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

