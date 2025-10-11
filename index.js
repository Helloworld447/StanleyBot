const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const locateChrome = require("chrome-location");

const product_url =
  "https://www.stanley1913.com/products/adventure-quencher-travel-tumbler-40-oz?variant=44560433152127";

async function givePage() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  return page;
}

async function addtoCart(page) {
  await page.waitForSelector("button[name='add']"); //Scans the entire document so be careful of selecting the same attribute names
  await page.evaluate(() => {
    document.querySelector("button[name='add']").click();
  });

  //An initial bug was that since the program clicks the buttons too fast, the website actually ends up going to the home page instead. So we do:
  await new Promise((resolve) => setTimeout(resolve, 1200)); //Can be optimized

  await page.waitForSelector("button[name='checkout']");
  await page.evaluate(() => {
    document.querySelector("button[name='checkout']").click();
  });
}

async function billing(page) {
  //Inputting the email
  await page.waitForSelector("input[name='email']");
  await page.type("input[name='email']", "niduwararahubedde@gmail.com");

  //Inputting the first name
  //await page.waitForSelector("input[name='firstName']");
  await page.type("input[name='firstName']", "Nidu");

  //Inputting the last name
  //await page.waitForSelector("input[name='lastName']");
  await page.type("input[name='lastName']", "Rahubedde");

  //Inputting the address
  //await page.waitForSelector("input[name='address1']");
  await page.type("input[name='address1']", "733 W Linden St");

  //Inputting the city
  //await page.waitForSelector("input[name= 'city']");
  await page.type("input[name='city']", "Riverside");

  //Inputting the zip code
  //await page.waitForSelector("input[name='postalCode']");
  await page.type("input[name='postalCode']", "92507");

  //The main bug I faced here was that the website's input was entered but not VALIDATED, because input-related events such as input, change, blue did not trigger.

  const phoneInputSelector = "input[name='phone']";

  // Wait for the phone input to appear
  await page.waitForSelector(phoneInputSelector);

  // Click into the input to focus
  await page.click(phoneInputSelector);

  // Type slowly to mimic human typing
  await page.type(phoneInputSelector, "9515448189");

  // Blur the input to trigger validation
  await page.$eval(phoneInputSelector, (el) => el.blur());

  //Adding a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //Clicking on submit (continue to shipping button)
  await page.click("button[type='submit']");

  // Wait for the "Continue to payment" button to appear (use a unique selector)
  await page.waitForSelector('button[type="submit"]:not([disabled])', {
    visible: true,
  });

  // Optionally, add a delay if the button is slow to enable
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Click "Continue to payment"
  await page.click('button[type="submit"]:not([disabled])');
}

async function submitOrder(page) {
  // Fake Credit Card Details: VISA, 4716798414996849, 6/2029, 680
  //Entering credit card number
  let iframeCardNumber = await page.waitForSelector(
    "iframe[title='Field container for: Card number']" //Bascially selecting an <iframe> whose title exactly matches "Field conatiner for: Card number"
  );
  let innerPage = await iframeCardNumber.contentFrame();
  await innerPage.type("input[id='number']", "4716798414996849");

  //----------------------------------------------------------------------------------------------

  //Entering the expiry date
  let iframeExpiry = await page.waitForSelector(
    "iframe[title='Field container for: Expiration date (MM / YY)']"
  );
  let innerPage2 = await iframeExpiry.contentFrame(); // contentFrame() gives you access to the page inside that iframe, so you can interact with its elements (like typing into inputs).
  await innerPage2.type("input[id='expiry']", "0629", { delay: 50 }); //MM/YY format

  //----------------------------------------------------------------------------------------------
  //Entering the CVC
  let iframeCVC = await page.waitForSelector(
    "iframe[title='Field container for: Security code']"
  );
  let innerPage3 = await iframeCVC.contentFrame();
  await innerPage3.type("input[id='verification_value']", "680");

  //----------------------------------------------------------------------------------------------
  //Clicking on the "Complete order" button
  await new Promise((resolve) => setTimeout(resolve, 2000)); //Adding a delay to ensure the page is ready

  await page.evaluate(() => {
    const buttons = Array.from(
      document.querySelectorAll("button[type='submit']")
    );
    const btn = buttons.find((b) => b.textContent.trim() === "Pay now");
    if (btn) btn.click();
  });
}

async function run() {
  const page = await givePage();
  await page.goto(product_url);

  await addtoCart(page);
  await billing(page);
  await submitOrder(page);
}

run();
