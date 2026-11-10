import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9217',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9217/json/new', { method: 'PUT' })
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

    console.log('1. Loading homepage...')
    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    // Capture Hero
    const { data: heroShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-scroll-hero.png', Buffer.from(heroShot, 'base64'))

    // Scroll to Philosophy
    console.log('2. Scrolling to Philosophy...')
    await send('Runtime.evaluate', {
      expression: `document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth', block: 'center' })`
    })
    await new Promise((r) => setTimeout(r, 1000))
    const { data: philShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-scroll-philosophy.png', Buffer.from(philShot, 'base64'))

    // Scroll to Turnkey (Problem/Promise)
    console.log('3. Scrolling to Turnkey...')
    await send('Runtime.evaluate', {
      expression: `document.getElementById('turnkey')?.scrollIntoView({ behavior: 'smooth', block: 'center' })`
    })
    await new Promise((r) => setTimeout(r, 1000))
    const { data: turnkeyShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-scroll-turnkey.png', Buffer.from(turnkeyShot, 'base64'))

    // Scroll to Process
    console.log('4. Scrolling to Process (5 Steps)...')
    await send('Runtime.evaluate', {
      expression: `document.getElementById('process')?.scrollIntoView({ behavior: 'smooth', block: 'center' })`
    })
    await new Promise((r) => setTimeout(r, 1000))
    const { data: processShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-scroll-process.png', Buffer.from(processShot, 'base64'))

    // Scroll to Footer
    console.log('5. Scrolling to Footer...')
    await send('Runtime.evaluate', {
      expression: `document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth', block: 'center' })`
    })
    await new Promise((r) => setTimeout(r, 1000))
    const { data: footerShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-scroll-footer.png', Buffer.from(footerShot, 'base64'))

    console.log('All scroll animation verification screenshots saved!')
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Test error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

