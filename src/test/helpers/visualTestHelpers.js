import puppeteer from 'puppeteer';
import ReactDOMServer from 'react-dom/server';
export async function setupVisualTest() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    return { browser, page };
}
export async function injectStyles(page, component) {
    const html = ReactDOMServer.renderToString(component);
    await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Reset styles to ensure consistent testing */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background: #F9FAFB;
            font-family: system-ui, -apple-system, sans-serif;
          }
        </style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
}
export async function takeScreenshot(page) {
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    // Wait for the content to be ready
    await page.waitForSelector('#root');
    return page.screenshot({
        fullPage: true,
    });
}
