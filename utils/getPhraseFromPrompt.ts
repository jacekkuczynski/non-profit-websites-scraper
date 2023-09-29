import prompt from "prompt";

export const getPhraseFromPrompt = async () => {
  prompt.message = "Enter the phrases:";
  prompt.delimiter = "";
  const { phrase } = await prompt.get({
    properties: {
      phrase: {
        message: "comma separated, example: example1, example2, example3",
        required: true,
      },
    },
  });

  return phrase.toString().split(",");
};
