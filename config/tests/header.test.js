const puppeteer = require('puppeteer');

let browser, page

beforeEach(async ()=>{
    browser = await puppeteer.launch({
        headless: false, // Keep visible for debugging
    });

    console.log("Browser launched, creating new page...");
    page = await browser.newPage();

    console.log("Navigating to localhost:3000...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
})

afterEach(async ()=>{
    console.log("Closing browser...");
    await browser.close();
})

test('The header has the correct test', async () => {
    console.log("Checking for selector...");
    await page.waitForSelector('a.brand-logo');

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    console.log("Extracted text:", text);
    expect(text).toEqual("Blogster");

});

test('Login flow', async()=>{
    await page.click('.right a');

    const url = await page.url()

    console.log(url)
})