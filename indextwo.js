const puppeque = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeque.use(StealthPlugin());

const product_url = "https://www.stanley1913.com/products/winterscape-quencher-h2-0-flowstate-tumbler-40-oz?variant=44559799746687";

const locateChrome = require("chrome-location");

async function givePage() {
  const browser = await puppeteer.launch({headless: false,});
  const page = await browser.newPage();
  return page;
}

