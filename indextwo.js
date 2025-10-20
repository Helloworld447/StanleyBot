const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const productURL = "https://www.stanley1913.com/products/stanley-x-loveshackfancy-quencher-h2-0-flowstate-tumbler-ibiza-sunset-40-oz?variant=53973275214184";

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
  cookies = await parseCookies(page);

  //Making the bot dynamic by fecthing the required IDs from the page itself
  const ID = await page.evaluate(() => {
    return document.querySelector("input[name = 'id']").getAttribute("value");
  })

  const sectionID =await page.evaluate(() => {
    return document.querySelector("input[name = 'section-id']").getAttribute("value");
  })

  const productID = await page.evaluate(() => {
    return document.querySelector("input[name = 'product-id']").getAttribute("value");
  })


  await page.evaluate(async (cookies, productURL, ID, sectionID, productID) => { // Page.evaluate is like doing the below code in the console and pressing enter
    let response = await fetch("https://www.stanley1913.com/cart/add", {
      "headers": {
        "accept": "application/javascript",
        "accept-language": "en-IN,en-US;q=0.9,en;q=0.8",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryuuRMhEdqP0nubWP0",  //Might have to do the dynaic bondary fetching for other websites, but Stanley seems to work with this static one
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookies,
        "Referer": productURL
      },
      "body": `------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"form_type\"\r\n\r\nproduct\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"utf8\"\r\n\r\n✓\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"id\"\r\n\r\n${ID}\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"product-id\"\r\n\r\n${productID}\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"section-id\"\r\n\r\n${sectionID}\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"quantity\"\r\n\r\n1\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0--\r\n`,
      "method": "POST"
    });
  }, cookies, productURL, ID, sectionID, productID);
}

async function getShippingToken(page) {
  let response = await page.evaluate(async (cookies, productURL) => {
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
          "Referer": productURL
        },
        "body": null,
        "method": "GET"
      });
      response = await response.json();
      return response;
    },cookies, productURL);

  let token = response.token.split("?")[0];
  console.log(token);
  let shippingURL = "https://www.stanley1913.com/checkouts/cn/" + token + "/information";
  await page.goto(shippingURL);
}

async function run() {
  const page = await givePage();

  await page.goto(productURL);
  await addToCart(page);
  await getShippingToken(page);
  console.log("Done");

}

run();