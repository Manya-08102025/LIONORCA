import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9236',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9236/json/new', { method: 'PUT' })
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

    await send('Page.navigate', { url: 'http://localhost:5175/admin' })
    await new Promise(r => setTimeout(r, 1200))

    // Set founder session directly and reload
    await send('Runtime.evaluate', {
      expression: `
        localStorage.setItem('lionorca_founder_active_session', JSON.stringify({
          session: { access_token: 'valid' },
          user: { email: 'founder@lionorca.com', name: 'Akshay Jadaun' }
        }));
        window.location.reload();
      `
    })

    await new Promise(r => setTimeout(r, 1500))

    const dashShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-architects-preview.png', Buffer.from(dashShot.data, 'base64'))
    console.log('Successfully captured authenticated admin dashboard!')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Test error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1200)

