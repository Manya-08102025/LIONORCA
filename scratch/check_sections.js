import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9214',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9214/json/new', { method: 'PUT' })
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
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })

    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    // Capture media
    await send('Runtime.evaluate', {
      expression: `document.getElementById('media')?.scrollIntoView({ behavior: 'instant', block: 'start' })`
    })
    await new Promise((r) => setTimeout(r, 800))
    const { data: b64Media } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/current_media.png', Buffer.from(b64Media, 'base64'))

    // Capture architects
    await send('Runtime.evaluate', {
      expression: `document.getElementById('architects')?.scrollIntoView({ behavior: 'instant', block: 'start' })`
    })
    await new Promise((r) => setTimeout(r, 800))
    const { data: b64Arch } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/current_architects.png', Buffer.from(b64Arch, 'base64'))

    console.log('Saved both screenshots!')
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

