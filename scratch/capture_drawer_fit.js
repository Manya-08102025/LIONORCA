import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' })
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

    // Test on desktop standard height 720p (like user's laptop screen)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
      mobile: false,
    })

    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    // Open drawer
    await send('Runtime.evaluate', {
      expression: `document.querySelector('button[aria-label="Open Navigation Menu"]').click()`
    })
    await new Promise((r) => setTimeout(r, 500))

    const { data: drawerShotDesktop } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-drawer-fit-desktop.png', Buffer.from(drawerShotDesktop, 'base64'))

    // Test on mobile viewport (iPhone 14 / standard mobile 390x800)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 800,
      deviceScaleFactor: 2,
      mobile: true,
    })
    await new Promise((r) => setTimeout(r, 400))

    const { data: drawerShotMobile } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-drawer-fit-mobile.png', Buffer.from(drawerShotMobile, 'base64'))

    console.log('Screenshots captured successfully!')
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

