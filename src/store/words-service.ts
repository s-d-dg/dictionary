import wordsObj from "../assets/data/words_dictionary.json";

export const getWords = (): string[] => {

  const words = Object.keys(wordsObj).slice(0, 50);
  console.log(words);

  return words;
};
