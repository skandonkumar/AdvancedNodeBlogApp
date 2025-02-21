// const puppeteer = require('puppeteer');
const Page = require("./helpers/page")

let page

beforeEach(async ()=>{

    page = await Page.build()

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
})

afterEach(async ()=>{
    await page.close();
})

test('The header has the correct text', async () => {
    await page.waitForSelector('a.brand-logo');

    const text = await page.getContentsOf('a.brand-logo');


    expect(text).toEqual("Blogster");

});

test('Login flow', async()=>{
    await page.click('.right a');

    const url = await page.url()

    expect(url).toMatch(/accounts\.google\.com/)
})

test('When signed in, shows logout button', async () => {
    // const id = "67a92abf3dbd3ce0a4d5496b";
    await page.login()
    

    page.getContentsOf('a[href="/auth/logout"]')
        .then(text => {
            expect(text).toEqual('Logout');
        })
        .catch(err => {
            console.log("Error: ", err);
        });
})