const puppeteer = require('puppeteer');
const sessionFactory = require("./factories/sessionFactory")
const userFactory = require("./factories/userFactory")

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
    // console.log("Closing browser...");
    // await browser.close();
})

test('The header has the correct test', async () => {
    await page.waitForSelector('a.brand-logo');

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual("Blogster");

});

// test('Login flow', async()=>{
//     await page.click('.right a');

//     const url = await page.url()
// })

test.only('When signed in, shows logout button', async () => {
    // const id = "67a92abf3dbd3ce0a4d5496b";
    const user = await userFactory();
    const {session, sig} = sessionFactory(user)
   

    await page.setCookie({ name: 'session', value: session });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    

    page.$eval('a[href="/auth/logout"]', el => el.innerHTML)
        .then(text => {
            expect(text).toEqual('Logout');
        })
        .catch(err => {
            console.log("Error: ", err);
        });
})