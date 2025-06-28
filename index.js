const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const locateChrome = require("chrome-location");

const product_url =
  "https://www.stanley1913.com/products/adventure-quencher-travel-tumbler-40-oz?variant=44560433152127";

async function givePage() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: locateChrome,
  });
  const page = await browser.newPage();
  return page;
}

async function addtoCart(page) {
  await page.waitforSelector("button[name='add']"); //Basically this waits for 30 secs, if the button doesn't show up they bot will crash
  await page.evaluate(() => {
    document.querySelector("button[name='add']").click();
  });

  await page.waitforSelector("button[name='checkout']");
  await page.evaluate(() => {
    document.querySelector("button[name='checkout']").click();
  });
}

async function billing(page) {}

async function submitOrder(page) {}

async function run() {
  const page = await givePage();
  await page.goto(product_url);

  await addtoCart(page);
  //await billing(page);
  //await payment(page);
  //await submitOrder(page);
}

run();
