import puppeteer from "puppeteer";

import { promises as fs } from "fs";

const launchScrapper = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto("https://www.startech.com.bd/component/graphics-card");

    /* const selector = ".main-content";
    await page.waitForSelector(selector);

    const el = await page.$(selector);

    const text = await el.evaluate((e) => e.innerHTML);

    console.log(text); */

    const selector = ".p-item";
    await page.waitForSelector(selector);

    const productData = await page.$$eval(".p-item", (items) => {
      return items.map((item) => {
        const name = item.querySelector(".p-item-name a").textContent;
        const description =
          item.querySelector(".short-description").textContent;
        const price = item.querySelector(".p-item-price span").textContent;

        const trimmedDesc = description.trim().split("\n").join(", ");
        return { name, description: trimmedDesc, price };
      });
    });

    console.log(productData);

    // Save Data to JSON

    fs.writeFile(
      "product-details.json",
      JSON.stringify(productData),
      (error) => {
        if (error) throw new Error(error);

        console.log("File Saved");
      }
    );
  } catch (error) {
    console.error(`Scrapping Failed`, error);
  } finally {
    await browser?.close();
  }
};

launchScrapper();
