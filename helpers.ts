import { Page } from "puppeteer";

export const interceptImageFontMediaRequest = async (page: Page) => {
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (
      req.resourceType() == "image" ||
      req.resourceType() == "stylesheet" ||
      req.resourceType() == "media" ||
      req.resourceType() == "font" ||
      req.resourceType() == "xhr" ||
      req.resourceType() == "websocket"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
};

export const waitForNetworkIdle = async (page: Page) => {
  try {
    await page.waitForNetworkIdle({ timeout: 5000 });
  } catch (err) {
    console.error("Navigation timeout exceeded");
  }
};
