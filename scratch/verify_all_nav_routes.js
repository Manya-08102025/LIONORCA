import { spawn } from 'child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--no-sandbox',
  '--disable-gpu',
])

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9224/json/new', { method: 'PUT' })
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

    console.log('--- TEST 1: Load /work-with-us and click "Home" in drawer ---')
    await send('Page.navigate', { url: 'http://localhost:5173/work-with-us?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    // Open Drawer
    await send('Runtime.evaluate', {
      expression: `document.querySelector('button[aria-label="Open Navigation Menu"]').click()`
    })
    await new Promise((r) => setTimeout(r, 400))

    // Click "Home" link
    const clickHome = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const homeLink = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Home');
          if (homeLink) {
            homeLink.click();
            return true;
          }
          return false;
        })()
      `,
      returnByValue: true,
    })
    console.log('Clicked Home in drawer:', clickHome.result.value)
    await new Promise((r) => setTimeout(r, 500))

    const state1 = await send('Runtime.evaluate', {
      expression: `({
        pathname: window.location.pathname,
        isHomeRendered: !!document.getElementById('turnkey'),
        isDrawerClosed: !document.querySelector('button[aria-label="Close Navigation Menu"]')
      })`,
      returnByValue: true,
    })
    console.log('State after clicking Home:', state1.result.value)

    console.log('--- TEST 2: Load /work-with-us and click Top-Left Logo ---')
    await send('Page.navigate', { url: 'http://localhost:5173/work-with-us?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    await send('Runtime.evaluate', {
      expression: `document.querySelector('header a[href="/"]').click()`
    })
    await new Promise((r) => setTimeout(r, 500))

    const state2 = await send('Runtime.evaluate', {
      expression: `({
        pathname: window.location.pathname,
        isHomeRendered: !!document.getElementById('turnkey')
      })`,
      returnByValue: true,
    })
    console.log('State after clicking Logo:', state2.result.value)

    console.log('--- TEST 3: Load /work-with-us and click "How It Works" in drawer ---')
    await send('Page.navigate', { url: 'http://localhost:5173/work-with-us?nopreloader=true' })
    await new Promise((r) => setTimeout(r, 1200))

    await send('Runtime.evaluate', {
      expression: `document.querySelector('button[aria-label="Open Navigation Menu"]').click()`
    })
    await new Promise((r) => setTimeout(r, 400))

    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'How It Works');
          if (link) {
            link.click();
            return true;
          }
          return false;
        })()
      `
    })
    await new Promise((r) => setTimeout(r, 600))

    const state3 = await send('Runtime.evaluate', {
      expression: `({
        pathname: window.location.pathname,
        hash: window.location.hash,
        isHomeRendered: !!document.getElementById('process'),
        isDrawerClosed: !document.querySelector('button[aria-label="Close Navigation Menu"]')
      })`,
      returnByValue: true,
    })
    console.log('State after clicking How It Works:', state3.result.value)

    chromeProc.kill()
    process.exit(0)
  } catch (err) {
    console.error('Test error:', err)
    chromeProc.kill()
    process.exit(1)
  }
}, 800)

