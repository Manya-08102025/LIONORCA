import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9234',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9234/json/new', { method: 'PUT' })
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

    await send('Runtime.evaluate', {
      expression: `
        localStorage.setItem('lionorca_admin_auth', JSON.stringify({
          email: 'admin@lionorca.com',
          name: 'Akshay Jadaun',
          role: 'Founder & Principal Architect'
        }));
        window.location.reload();
      `
    })

    await new Promise(r => setTimeout(r, 1500))

    // Click third nav button directly by finding buttons in aside nav
    await send('Runtime.evaluate', {
      expression: `
        const navButtons = document.querySelectorAll('aside nav button');
        if (navButtons[2]) navButtons[2].click();
      `
    })

    await new Promise(r => setTimeout(r, 1200))

    const artShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-articles-preview.png', Buffer.from(artShot.data, 'base64'))
    console.log('Articles page captured')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Capture error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1200)
