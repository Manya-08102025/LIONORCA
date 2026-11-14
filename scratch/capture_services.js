import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9255',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9255/json/new', { method: 'PUT' })
    const data = await res.json()
    const ws = new WebSocket(data.webSocketDebuggerUrl)
    await new Promise((resolve) => {
      if (ws.readyState === 1) return resolve()
      ws.addEventListener('open', resolve, { once: true })
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

    // 1. Desktop Viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })

    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 2500))

    // Scroll to #services
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `,
    })
    await new Promise((r) => setTimeout(r, 1000))

    // Capture desktop screenshot
    const scr1 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/test-services-desktop.png', Buffer.from(scr1.data, 'base64'))
    console.log('Saved public/test-services-desktop.png')

    // Also scroll slightly above to see the transition between Steps to Clarity and Services
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('process');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'end' });
      `,
    })
    await new Promise((r) => setTimeout(r, 800))
    const scr2 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/test-steps-to-services-placement.png', Buffer.from(scr2.data, 'base64'))
    console.log('Saved public/test-steps-to-services-placement.png')

    // 2. Mobile Viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    })
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `,
    })
    await new Promise((r) => setTimeout(r, 1000))
    const scr3 = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/test-services-mobile.png', Buffer.from(scr3.data, 'base64'))
    console.log('Saved public/test-services-mobile.png')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error during capture:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1500)

