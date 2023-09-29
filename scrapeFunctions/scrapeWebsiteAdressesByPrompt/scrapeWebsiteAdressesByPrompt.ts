import {
  interceptImageFontMediaRequest,
  waitForNetworkIdle,
} from "../../helpers";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { removeForbiddenURLs } from "../../utils/removeForbiddenURLs";

export const scrapeWebsiteAdressesByPrompt = async (query: string) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await interceptImageFontMediaRequest(page);
  await page.goto("https://duckduckgo.com/");
  await page.setViewport({ width: 1080, height: 1024 });
  await page.type(`input[aria-label="Search with DuckDuckGo"]`, query);
  const searchResultSelector = `button[aria-label="Search"]`;
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);
  await waitForNetworkIdle(page);

  const loadMoreResults = async () => {
    try {
      const loadMoreResultsSelector = "#more-results";
      if ((await page.$(loadMoreResultsSelector)) !== null) {
        await page.waitForSelector(loadMoreResultsSelector);
        await page.click(loadMoreResultsSelector);
        await page.waitForTimeout(300);
        await loadMoreResults();
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  console.log(`loading more results for query: ${query}`);
  await loadMoreResults();
  console.log(`finished loading results for query: ${query}`);

  const getWebsiteAdresses = await page.evaluate(() => {
    let urls: string[] = [];
    const h2Elements = document.querySelectorAll("h2");
    h2Elements.forEach((h2Element) => {
      const linkElement = h2Element.querySelector("a");
      if (linkElement) {
        const url = linkElement.getAttribute("href");
        urls.push(url);
      }
    });

    return urls;
  });

  //remove the duplicates and forbidden url
  const urlWoDuplicates = Array.from(new Set(getWebsiteAdresses));
  const urlsWoForbidden = removeForbiddenURLs(urlWoDuplicates);

  // check if dir exist; make dir "scrapedData" and save to JSON
  const dirPath = path.join(__dirname, "..", "..", "scrapedData");
  if (fs.existsSync(dirPath)) {
    let data = JSON.stringify(urlsWoForbidden);
    fs.writeFile(`${dirPath}/${query}.json`, data, (err) => {
      if (err) throw err;
      console.log(`Scraped data for phrase: ${query} written to file`);
    });
  } else {
    fs.mkdir(dirPath, (err) => {
      if (err) {
        return console.error(err);
      }
      let data = JSON.stringify(urlsWoForbidden);
      fs.writeFile(`${dirPath}/${query}.json`, data, (err) => {
        if (err) throw err;
        console.log(`Scraped data for phrase: ${query} written to file`);
      });
      console.log("Directory created successfully!");
    });
  }

  await browser.close();
  return;
};
