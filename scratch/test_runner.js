import { spawn } from 'child_process'
import fs from 'fs'
import http from 'http'

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) resolve()
          else reject(new Error('Status ' + res.statusCode))
        })
        req.on('error', reject)
        req.setTimeout(1000, () => {
          req.destroy()
          reject(new Error('Timeout'))
        })
      })
      return true
    } catch {
      await new Promise((r) => setTimeout(r, 400))
    }
  }
  throw new Error('Server did not become ready at ' + url)
}

async function run() {
  const preview = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', '4173', '--host'], {
    stdio: 'inherit',
  })

  try {
    await waitForServer('http://127.0.0.1:4173')
    const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=9275',
      '--no-sandbox',
      '--disable-gpu',
    ])
    await new Promise((r) => setTimeout(r, 1500))

    const res = await fetch('http://127.0.0.1:9275/json/new', { method: 'PUT' })
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })

    await send('Page.navigate', { url: 'http://127.0.0.1:4173/?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1500))

    // Click on "Multi-storey Buildings" card (5th card, index 4)
    await send('Runtime.evaluate', {
      expression: `
        const cards = document.querySelectorAll('#services .cursor-pointer');
        if (cards[4]) cards[4].click();
      `,
    })
    await new Promise((r) => setTimeout(r, 800))

    // Check modal select specifically inside form
    const result = await send('Runtime.evaluate', {
      expression: `
        const formSelect = document.querySelector('form select');
        formSelect ? formSelect.value : null;
      `,
      returnByValue: true,
    })
    console.log('Selected value in modal form:', result.result.value)

    const scrModal = await send('Page.captureScreenshot', { format: 'png' })
    fs.writeFileSync('public/test-preselected-multistorey.png', Buffer.from(scrModal.data, 'base64'))

    ws.close()
    chromeProc.kill()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    preview.kill()
    process.exit(0)
  }
}

run()
