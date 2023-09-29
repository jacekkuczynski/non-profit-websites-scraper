import { getPhraseFromPrompt } from "./utils/getPhraseFromPrompt";
import { scrapeWebsiteAdressesByPrompt } from "./scrapeFunctions/scrapeWebsiteAdressesByPrompt/scrapeWebsiteAdressesByPrompt";

const main = async () => {
  const phrases = await getPhraseFromPrompt();

  for (const [index, phrase] of phrases.entries()) {
    try {
      console.log(
        `=== SCRAPING PHRASE ${phrase}, ${index + 1}/${phrases.length} ===`
      );
      await scrapeWebsiteAdressesByPrompt(phrase);
    } catch (error) {
      console.log(error);
      continue;
    }
  }

  console.log("✨✨✨ ALL DONE ✨✨✨");
};

main();
