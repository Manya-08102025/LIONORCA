import http from 'http'
import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9229/json/new', { method: 'PUT' })
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

    await send('Runtime.enable')
    await send('Page.enable')

    // Set mobile device metrics (iPhone 14 / 15 dimensions)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true,
    })

    const artifactDir = path.resolve('C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e')

    // 1. Mobile Homepage Hero
    console.log('Navigating to homepage on mobile...')
    await send('Page.navigate', { url: 'http://localhost:5173/?nopreloader=true' })
    await new Promise(r => setTimeout(r, 2200))
    let shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync(path.join(artifactDir, 'mobile-preview-hero.png'), Buffer.from(shot.data, 'base64'))
    console.log('Saved mobile-preview-hero.png')

    // 2. Mobile Founder's Philosophy
    const philTop = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('philosophy');
        if (!el) return 0;
        return Math.round(el.getBoundingClientRect().top + window.scrollY) - 60;
      })()`,
      returnByValue: true
    })
    const philY = philTop?.result?.value || 750
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${philY}, behavior: 'instant' }); if (window.lenis) window.lenis.scrollTo(${philY}, { immediate: true });`
    })
    await new Promise(r => setTimeout(r, 1000))
    shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync(path.join(artifactDir, 'mobile-preview-philosophy.png'), Buffer.from(shot.data, 'base64'))
    console.log('Saved mobile-preview-philosophy.png')

    // 3. Mobile Steps to Clarity (Process)
    const procTop = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('process');
        if (!el) return 0;
        return Math.round(el.getBoundingClientRect().top + window.scrollY) - 60;
      })()`,
      returnByValue: true
    })
    const procY = procTop?.result?.value || 3000
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${procY}, behavior: 'instant' }); if (window.lenis) window.lenis.scrollTo(${procY}, { immediate: true });`
    })
    await new Promise(r => setTimeout(r, 1000))
    shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync(path.join(artifactDir, 'mobile-preview-process.png'), Buffer.from(shot.data, 'base64'))
    console.log('Saved mobile-preview-process.png')

    // 4. Mobile Work With Us page
    console.log('Navigating to /work-with-us on mobile...')
    await send('Page.navigate', { url: 'http://localhost:5173/work-with-us?nopreloader=true' })
    await new Promise(r => setTimeout(r, 2000))
    shot = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync(path.join(artifactDir, 'mobile-preview-workwithus.png'), Buffer.from(shot.data, 'base64'))
    console.log('Saved mobile-preview-workwithus.png')

    ws.close()
    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 1200)

