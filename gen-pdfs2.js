const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ headless: false });
  console.log('✅ Browser launched. Navigating to the page...');
  const page = await browser.newPage();
  console.log('📄 Waiting for the student report page to load...');
  await page.goto('http://localhost:3000/studentnumber?studentnumber=4511157');
  console.log('📄 Page loaded. Generating PDF...');
  console.log(page);
})();
