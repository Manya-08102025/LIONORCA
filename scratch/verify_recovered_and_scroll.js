import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9216',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9216/json/new', { method: 'PUT' })
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

    console.log('1. Loading page...')
    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    // Scroll to turnkey
    console.log('2. Scrolling to turnkey...')
    await send('Runtime.evaluate', {
      expression: `document.getElementById('turnkey')?.scrollIntoView({ behavior: 'instant', block: 'start' })`
    })
    await new Promise((r) => setTimeout(r, 1000))

    const { data: turnkeyShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-recovered-turnkey.png', Buffer.from(turnkeyShot, 'base64'))

    // Scroll to process
    console.log('3. Scrolling to process...')
    await send('Runtime.evaluate', {
      expression: `document.getElementById('process')?.scrollIntoView({ behavior: 'instant', block: 'start' })`
    })
    await new Promise((r) => setTimeout(r, 1000))

    const { data: processShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-recovered-process.png', Buffer.from(processShot, 'base64'))

    // Now test scroll up then down to verify repeat animation
    console.log('4. Scrolling back up to top, then down again to test once: false...')
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 0, behavior: 'instant' })`
    })
    await new Promise((r) => setTimeout(r, 600))

    await send('Runtime.evaluate', {
      expression: `document.getElementById('turnkey')?.scrollIntoView({ behavior: 'smooth', block: 'start' })`
    })
    await new Promise((r) => setTimeout(r, 1000))

    const { data: repeatShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-recovered-repeat-scroll.png', Buffer.from(repeatShot, 'base64'))

    console.log('All verification screenshots captured successfully!')
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Test error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

