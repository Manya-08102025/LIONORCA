import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9223/json/new', { method: 'PUT' })
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

    console.log('1. Navigating to /work-with-us...')
    await send('Page.navigate', { url: 'http://localhost:5173/work-with-us?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    const initPath = await send('Runtime.evaluate', {
      expression: 'window.location.pathname',
      returnByValue: true,
    })
    console.log('Initial Pathname:', initPath.result.value)

    console.log('2. Clicking 3 lines (hamburger menu)...')
    await send('Runtime.evaluate', {
      expression: `document.querySelector('button[aria-label="Open Navigation Menu"]').click()`
    })
    await new Promise((r) => setTimeout(r, 400))

    const isDrawerOpen = await send('Runtime.evaluate', {
      expression: `!!document.querySelector('button[aria-label="Close Navigation Menu"]')`,
      returnByValue: true,
    })
    console.log('Is Drawer Open:', isDrawerOpen.result.value)

    console.log('3. Clicking Cross (X) button inside drawer...')
    await send('Runtime.evaluate', {
      expression: `document.querySelector('button[aria-label="Close Navigation Menu"]').click()`
    })
    await new Promise((r) => setTimeout(r, 600))

    const finalState = await send('Runtime.evaluate', {
      expression: `({
        pathname: window.location.pathname,
        isDrawerClosed: !document.querySelector('button[aria-label="Close Navigation Menu"]'),
        isTurnkeyPresent: !!document.getElementById('turnkey'),
        heroText: document.querySelector('h1')?.textContent?.trim()
      })`,
      returnByValue: true,
    })
    console.log('Final State after clicking cross:', finalState.result.value)

    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Test error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

