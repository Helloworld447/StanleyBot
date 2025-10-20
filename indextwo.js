const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const product_url = "https://www.stanley1913.com/products/winterscape-quencher-h2-0-flowstate-tumbler-40-oz?variant=44559799746687";

var cookies = "";

const locateChrome = require("chrome-location");

async function givePage() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  return page;
}

async function parseCookies(page){
  const cookies = await page.cookies();
  let cookieList = "";
  for (let i =0; i < cookies.length; i++){
    let cookie = cookies[i];
    let cookieString = cookie.name + cookie.value;
    if ( i != (cookies.length - 1)) {
      cookieList = cookieList + cookieString;
    }
    cookieList = cookieList + cookieString;
  }
  console.log(cookieList);
  return cookieList;
}

async function addToCart(page) {
  await page.waitForSelector("button[name = 'add']");
  cookies = await page.cookies();
  await page.evaluate(async (cookies) => { // Page.evaluate is like doing the below code in the console and pressing enter
    let response = await fetch("https://www.stanley1913.com/cart/add", {
      "headers": {
        "accept": "application/javascript",
        "accept-language": "en-IN,en-US;q=0.9,en;q=0.8",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryuuRMhEdqP0nubWP0",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookies,
        "Referer": "https://www.stanley1913.com/products/winterscape-quencher-h2-0-flowstate-tumbler-40-oz?variant=44559799746687"
      },
      "body": "------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"form_type\"\r\n\r\nproduct\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"utf8\"\r\n\r\n✓\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"id\"\r\n\r\n44559799746687\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"product-id\"\r\n\r\n8160873676927\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"section-id\"\r\n\r\ntemplate--24580316725608__4b86bc5c-f0d6-46d6-8684-1235f066332e\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"quantity\"\r\n\r\n1\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0--\r\n",
      "method": "POST"
    });
  }, cookies);
}

async function getShippingToken(page) {
  let response = await page.evaluate(async (cookies) => {
      let response = await fetch("https://www.stanley1913.com/cart.js", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-IN,en-US;q=0.9,en;q=0.8",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": cookies,
          "Referer": "https://www.stanley1913.com/products/winterscape-quencher-h2-0-flowstate-tumbler-40-oz?variant=44559799746687"
        },
        "body": null,
        "method": "GET"
      });
      response = await response.json();
      return response;
    },cookies);

  console.log(response.token);
  let token = response.token.split("?")[0];
  let shippingURL = "https://www.stanley1913.com/checkouts/cn/" + token + "/information";
  await page.goto(shippingURL);
}

async function run() {
  const page = await givePage();

  await page.goto(product_url);
  await addToCart(page);
  await getShippingToken(page);
  console.log("Done");

}

run();