import { Page } from "puppeteer";

export const interceptImageFontMediaRequest = async (page: Page) => {
  await page.setRequestInterception(true);
  const arrToIntercept = [
    "image",
    "stylesheet",
    "media",
    "font",
    "xhr",
    "websocket",
  ];
  page.on("request", (req) => {
    if (arrToIntercept.includes(req.resourceType())) {
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
