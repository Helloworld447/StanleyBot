const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const product_url = "https://www.stanley1913.com/products/winterscape-quencher-h2-0-flowstate-tumbler-40-oz?variant=44559799746687";

const locateChrome = require("chrome-location");

async function givePage() {
  const browser = await puppeteer.launch({headless: false,});
  const page = await browser.newPage();
  return page;
}

async function addToCartPage(page) {
  await page.waitForSelector("button[name = 'add']");
  await page.evaluate(() => { // Page.evaluate is like doing the below code in the console and pressing enter
    async function atc(){
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
          "cookie": "localization=US; cart_currency=USD; BVBRANDID=85dae0c0-c232-4b71-92cd-3794c5e231e9; cart=hWN4EnfrJ19XpPJIg9xySDCi%3Fkey%3D3ed1b7fe2b8be3472513f6becccd882a; crl8.fpcuid=2a136a38-e5e0-49bb-8946-a0a0227491cd; OptanonAlertBoxClosed=2025-10-18T00:05:51.920Z; bv_metrics=true; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Oct+18+2025+14%3A58%3A59+GMT-0700+(Pacific+Daylight+Time)&version=202509.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=b9bedbcc-cf20-45e4-a9ad-78ad9f87e621&interactionCount=2&isAnonUser=1&landingPath=NotLandingPage&groups=C0004%3A0%2CC0002%3A0%2CC0003%3A0%2CC0001%3A1&intType=2&geolocation=US%3BCA&AwaitingReconsent=false; BVBRANDSID=7a270c4e-6c19-4b66-8174-5e31989db214; _shopify_essential=:AZn0oiPBAAEAWrAM9apjSI2fEAV8t25TN0RXvXTngV2YyCjhKNK9OqE68IruVU67lzDIPKnzIBlFSY_l49toHC_3f76MQ9zNFQF0JOXPpxOZEXPBSbo3EHI9EwFbPPKIQd99qdxq8agrg60fKlN1CfFXiAx7yy4ToCQ-FiB_WvAUmCm2_SW6ziM34ojLZxPZ6GeoAFQQRwGbv1SD2yzZWOvN4oHxF3lRrfQ_HgY4LGRX8uooBH1_F1g-N_nhnH_7Fix52-2jbJZG2u8p2iIX9ehLzy8JsCydzR4m7onBrvI2bQbNXVztRoRwYI8Jv6q1wMS9_1rUD6pCugXNJsdThN4srfbohB8nooDmYfP6lssphLoMrxV-_A59dOoJiGiQ7OX5aDwMHMtbb1IUOmqvJlXPriSPfeQt_cTBQ4NHZj2IgYUJsLcKhomjnqZykiti-wnu82yYYKx2nop6F2onKivrJ21p9PmOSUMzOzuU1V_u4JmnXb3l6fcEfMMS1nqSnTwP6emFK2iESZUn_MrO-FyjPza0XXLd-Us4XLG1qFJ2G0RP-Vg4zGzTHHGPhpAErcX2Ic78xuRMKERKOC0qJZ62OJcHc0lFVW2bNuItl7ml_3JPSdvyIZm-IJNNCbcX5KMhWILG2B_b127wjsKpDkYAIXbq2YJZTh4Iy-AATSYk5TrKteadhCzXfvsBmVWvVaEyiPmalJgCYXcx52jVVaQfiCpcWx70NYZ7F5cNUqVW7xVm-jCFqAwoCx9FtfAP5o3BoAB9kjTxqz_FzEqhKoqrvWd080PXDURAbvo9OlbXQuXCA1B5_T35m2iTRIzKDzGBXJFsurnHgqo3L2SIQJ_2MNS9Qtw_2a6jOduSxtoZ8MQ:; keep_alive=eyJ2IjoyLCJ0cyI6MTc2MDgyNDg1NDA0NCwiZW52Ijp7IndkIjowLCJ1YSI6MSwiY3YiOjEsImJyIjoxfSwiYmh2Ijp7Im1hIjo1MiwiY2EiOjMsImthIjowLCJzYSI6NCwia2JhIjowLCJ0YSI6MCwidCI6MTE1LCJubSI6MSwibXMiOjAuMzgsIm1qIjoyLjY5LCJtc3AiOjEuOTgsInZjIjoxLCJjcCI6MC4yOCwicmMiOjAsImtqIjowLCJraSI6MCwic3MiOjAuNzMsInNqIjowLjYsInNzbSI6MSwic3AiOjAsInRzIjowLCJ0aiI6MCwidHAiOjAsInRzbSI6MH0sInNlcyI6eyJwIjoxLCJzIjoxNzYwODI0NzM4MjExLCJkIjoxMTN9fQ%3D%3D",
          "Referer": "https://www.stanley1913.com/products/winterscape-quencher-h2-0-flowstate-tumbler-40-oz?variant=44559799746687"
        },
        "body": "------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"form_type\"\r\n\r\nproduct\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"utf8\"\r\n\r\n✓\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"id\"\r\n\r\n44559799746687\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"product-id\"\r\n\r\n8160873676927\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"section-id\"\r\n\r\ntemplate--24580316725608__4b86bc5c-f0d6-46d6-8684-1235f066332e\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0\r\nContent-Disposition: form-data; name=\"quantity\"\r\n\r\n1\r\n------WebKitFormBoundaryuuRMhEdqP0nubWP0--\r\n",
        "method": "POST"
      });
    }
    atc();
  });
}

async function getShippingToken(page) {
  let response = await page.evaluate(() => {

    async function getResponse(){
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
          "cookie": "localization=US; cart_currency=USD; BVBRANDID=85dae0c0-c232-4b71-92cd-3794c5e231e9; cart=hWN4EnfrJ19XpPJIg9xySDCi%3Fkey%3D3ed1b7fe2b8be3472513f6becccd882a; crl8.fpcuid=2a136a38-e5e0-49bb-8946-a0a0227491cd; OptanonAlertBoxClosed=2025-10-18T00:05:51.920Z; bv_metrics=true; BVBRANDSID=56d95ced-18ff-49da-9768-52daaacd74cd; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Oct+18+2025+15%3A49%3A30+GMT-0700+(Pacific+Daylight+Time)&version=202509.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=b9bedbcc-cf20-45e4-a9ad-78ad9f87e621&interactionCount=2&isAnonUser=1&landingPath=NotLandingPage&groups=C0004%3A0%2CC0002%3A0%2CC0003%3A0%2CC0001%3A1&intType=2&geolocation=US%3BCA&AwaitingReconsent=false; keep_alive=eyJ2IjoyLCJ0cyI6MTc2MDgyNzc4NTQzOCwiZW52Ijp7IndkIjowLCJ1YSI6MSwiY3YiOjEsImJyIjoxfSwiYmh2Ijp7Im1hIjoyMywiY2EiOjEsImthIjowLCJzYSI6Mywia2JhIjowLCJ0YSI6MCwidCI6MTYsIm5tIjoxLCJtcyI6MC4xMywibWoiOjMuMDgsIm1zcCI6Mi4yMiwidmMiOjAsImNwIjowLCJyYyI6MCwia2oiOjAsImtpIjowLCJzcyI6MC40NCwic2oiOjAuNjIsInNzbSI6MSwic3AiOjAsInRzIjowLCJ0aiI6MCwidHAiOjAsInRzbSI6MH0sInNlcyI6eyJwIjo0LCJzIjoxNzYwODI0NzM4MjExLCJkIjozMDI2fX0%3D; _shopify_essential=%3AAZn0oiPBAAEA5ZJGZvEpnlyVQal-UpwMmxu6ZRDtJ3Su3KNxy6yU-xjTYwyxqwKfTtgPFtj-kDtBlHksDLLAd3ANv1UNcC4gJwTfEc0fnAXlFCs9DOa9P-7OXIv0GHvPCL8AeFKl9Av9CjrFFVvJwGG9M2pJaNahW3Aj2q2ywxgfrcSM2g58EDTcRmOqCNEOoXKkBLaAduvSsNkzT3kXLvmlLOhIrY1Mh71eR0dEb1fGOi6DcdtryUUifUUTJ_66-xjRxUQY74PdoZe5J8DDcazdiWFdBdW5d0kpufo17dbpmIueO5xG-gF7HYXKhIx1jaT-8yjrzwamKOVe0PSY91i3h6JM4RE8JzPP-XgU-nXspUybfVRfXF3NwEnrFo80oHHcUYscRykkOpHeoO6tV4iieAMwRlbzomZCZaxrAnKSEkJZNfCvV7wMy7zLHyvqU-QBQRnSOKlo-F7u6H4m3B30AO_c83HX5JfrhbMBUIhssSRv1nGuvz6GG-s9G-FHuqA3RxI9R87GGfH4xmVtgNzB56XQ-ZDJuaIiBlSUaVmNbfMJXtue6jy13WQwjq74cW_XvvOMETMnk7egKSaepsGYRv9uzfy6KyVzWaOnydgK0kMukA51GcPVJVJUKWMFOGieDsgfK52AY8R-cNGNgEeoQp9dO9_TtzWio-ZRncgCvkTvX24loHYPDJSD1V4HHd8El3zrJzA9pkgxgPoJQt77aHGkvGS6ToElGCJlxq8NNwDOdMs0U1636O8iE1gyVNjSlpxh4bBMLZLxtTBhy8nwOWp8xkir2cxpYnJ3c4izjPuMY5fxaAVpd7RSm2omU983IlQZtH7kXsdQ5CXEf0tDl7cfKEmfln63Y-5k8RXBL97pmqzr5PNwQw%3A",
          "Referer": "https://www.stanley1913.com/products/winterscape-quencher-h2-0-flowstate-tumbler-40-oz?variant=44559799746687"
        },
        "body": null,
        "method": "GET"
      });
      return response;
    }
    return getResponse();
  });

  response = await response.json();
  console.log(response.data)
  console.log(response.token);

}
async function run() {
  const page = await givePage();

  await page.goto(product_url);
  await addToCartPage(page);
  await getShippingToken(page);
  console.log("Done");

}

run();