import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9230/json/new', { method: 'PUT' })
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

    await send('Page.navigate', { url: 'http://localhost:5175/admin' })
    await new Promise(r => setTimeout(r, 1200))

    // Set auth
    await send('Runtime.evaluate', {
      expression: `
        localStorage.setItem('lionorca_admin_auth', JSON.stringify({
          email: 'admin@lionorca.com',
          name: 'Akshay Jadaun',
          role: 'Founder & Principal Architect',
          avatar: '/images/akshay-jadaun.jpg',
          authProvider: 'Local Admin',
          loginAt: Date.now()
        }));
        window.location.reload();
      `
    })

    await new Promise(r => setTimeout(r, 1800))

    // 1. Capture Module 1: Architect Flashcards
    const archShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-architects-preview.png', Buffer.from(archShot.data, 'base64'))
    console.log('Saved architects preview')

    // 2. Click Signature Projects
    await send('Runtime.evaluate', {
      expression: `
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.textContent.includes('Signature Projects'));
        if (btn) btn.click();
      `
    })
    await new Promise(r => setTimeout(r, 1000))
    const projShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-projects-preview.png', Buffer.from(projShot.data, 'base64'))
    console.log('Saved projects preview')

    // 3. Click Media & Insights
    await send('Runtime.evaluate', {
      expression: `
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.textContent.includes('Media & Insights'));
        if (btn) btn.click();
      `
    })
    await new Promise(r => setTimeout(r, 1000))
    const artShot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/admin-articles-preview.png', Buffer.from(artShot.data, 'base64'))
    console.log('Saved articles preview')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Capture error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1200)
