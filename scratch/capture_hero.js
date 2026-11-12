import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9244',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9244/json/new', { method: 'PUT' })
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
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
      mobile: false,
    })

    // Capture slide 0
    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true&slide=0' })
    await new Promise(r => setTimeout(r, 1500))
    const shot0 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/hero-current-slide0.png', Buffer.from(shot0.data, 'base64'))

    // Capture slide 1
    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true&slide=1' })
    await new Promise(r => setTimeout(r, 1500))
    const shot1 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/hero-current-slide1.png', Buffer.from(shot1.data, 'base64'))

    // Capture slide 2
    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true&slide=2' })
    await new Promise(r => setTimeout(r, 1500))
    const shot2 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/hero-current-slide2.png', Buffer.from(shot2.data, 'base64'))

    console.log('Saved current slides')
    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1500)
