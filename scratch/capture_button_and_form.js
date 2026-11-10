import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9221',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9221/json/new', { method: 'PUT' })
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
      height: 950,
      deviceScaleFactor: 1,
      mobile: false,
    })

    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true#architects' })
    await new Promise((r) => setTimeout(r, 1200))

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('architects');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    })
    await new Promise((r) => setTimeout(r, 800))

    // Screenshot 1: Architect Flashcards with new View Profile buttons
    const { data: archShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-architect-gold-buttons.png', Buffer.from(archShot, 'base64'))

    // Screenshot 2: Open Consultation modal
    await send('Runtime.evaluate', {
      expression: `
        const consultBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Schedule Consultation') || b.textContent.includes('Consultation') || b.textContent.includes('Discovery Session'));
        if (consultBtn) consultBtn.click();
      `
    })
    await new Promise((r) => setTimeout(r, 600))

    const { data: modalShot } = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-consultation-form-simplified.png', Buffer.from(modalShot, 'base64'))

    console.log('Verification screenshots captured successfully!')
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

