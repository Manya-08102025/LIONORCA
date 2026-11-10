import fs from 'fs'
import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9225',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9225/json/new', { method: 'PUT' })
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

    // Navigate to /work-with-us
    await send('Page.navigate', { url: 'http://localhost:5173/work-with-us?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    // Click logo
    const clickLogoRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const logoLink = document.querySelector('header a[href="/"]');
          if (logoLink) {
            logoLink.click();
            return { found: true, pathname: window.location.pathname };
          }
          return { found: false };
        })()
      `,
      returnByValue: true,
    })
    console.log('Click logo result:', clickLogoRes.result.value)

    await new Promise((r) => setTimeout(r, 600))
    const pathAfter = await send('Runtime.evaluate', {
      expression: 'window.location.pathname',
      returnByValue: true,
    })
    console.log('Pathname after clicking logo:', pathAfter.result.value)

    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Error during test:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

