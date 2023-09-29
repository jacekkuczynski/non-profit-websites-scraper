import { getPhraseFromPrompt } from "./utils/getPhraseFromPrompt";
import { scrapeWebsiteAdressesByPrompt } from "./scrapeFunctions/scrapeWebsiteAdressesByPrompt/scrapeWebsiteAdressesByPrompt";

const main = async () => {
  const phrases = await getPhraseFromPrompt();

  let i = 1;
  for (const phrase of phrases) {
    try {
      console.log(`=== SCRAPING PHRASE ${phrase}, ${i}/${phrases.length} ===`);
      await scrapeWebsiteAdressesByPrompt(phrase);
      i++;
    } catch (error) {
      i++;
      console.log(error);
      continue;
    }
  }

  console.log("✨✨✨ ALL DONE ✨✨✨");
};

main();
