import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9248',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9248/json/new', { method: 'PUT' })
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

    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true#architects' })
    await new Promise(r => setTimeout(r, 1500))

    // Scroll to #architects
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('architects');
        if (el) el.scrollIntoView({ block: 'start' });
      `
    })
    await new Promise(r => setTimeout(r, 800))

    // 1. Capture 3-card Carousel (Cards 1, 2, 3)
    const shot1 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/architects-carousel-123.png', Buffer.from(shot1.data, 'base64'))
    console.log('Saved architects-carousel-123.png')

    // 2. Click Next arrow to slide to 2, 3, 4
    await send('Runtime.evaluate', {
      expression: `
        const nextBtn = document.querySelector('button[aria-label="Next Architect Card"]');
        if (nextBtn) nextBtn.click();
      `
    })
    await new Promise(r => setTimeout(r, 700))
    const shot2 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/architects-carousel-234.png', Buffer.from(shot2.data, 'base64'))
    console.log('Saved architects-carousel-234.png')

    // 3. Click "View All Architects"
    await send('Runtime.evaluate', {
      expression: `
        const allBtns = Array.from(document.querySelectorAll('button'));
        const viewAllBtn = allBtns.find(b => b.textContent.includes('View All Architects'));
        if (viewAllBtn) viewAllBtn.click();
      `
    })
    await new Promise(r => setTimeout(r, 700))
    const shot3 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/architects-view-all.png', Buffer.from(shot3.data, 'base64'))
    console.log('Saved architects-view-all.png')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1500)
