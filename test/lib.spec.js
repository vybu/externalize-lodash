const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, { public: path.resolve(__dirname, 'dist') });
});

describe('externalize-lodash', () => {
  let browser;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: [ '–no-sandbox', '–disable-setuid-sandbox' ],
      headless: true,
    });
    await new Promise((r) => server.listen(3030, r));
  });
  afterAll(async () => {
    await browser.close();
    await new Promise((r) => server.close(r));
  });

  it('should not include lodash in bundle', () => {
    const webpackBuildStats = fs.readFileSync(
      path.resolve(__dirname, './dist/webpack.stats.json'),
      { encoding: 'utf-8' },
    );
    expect(webpackBuildStats.indexOf('node_modules/lodash')).toBe(-1);
  });

  it('should replace all lodash requires with working external cases', async () => {
    const passMsg = [];
    const failMsg = [];
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:3030');
    page.on('console', (m) => {
      const msg = m.text();
      if (msg.indexOf('TEST_FAIL') > -1) {
        failMsg.push(msg);
      }
      if (msg.indexOf('TEST_PASS') > -1) {
        passMsg.push(msg);
      }
    });
    await page.evaluate(() => window.run());

    expect(passMsg.length).toBe(6);
    expect(failMsg.length).toBe(0);
  });
});
