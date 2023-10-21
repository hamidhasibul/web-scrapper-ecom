import puppeteer from "puppeteer";

const launchScrapper = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto("https://developer.chrome.com/");

    page.getDefaultTimeout(2 * 60 * 1000);

    //   await page.screenshot({ path: "screenshot.png" });

    const html = await page.evaluate(() => {
      return document.documentElement.outerHTML;
    });

    console.log(html);
  } catch (error) {
    console.error(`Scrapping Failed`, error);
  } finally {
    await browser?.close();
  }
};

launchScrapper();
