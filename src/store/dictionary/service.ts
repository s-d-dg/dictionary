import { allWordsActions } from "./index";

import wordsObj from "../../assets/data/words_dictionary.json";
import { Dictionary, dictionaryObject } from "./model";

const getWords = async (): Promise<{dictionary: Dictionary, allWords: string[]}> => {
  return new Promise((resolve, reject) => {
    try {
      const words = Object.keys(wordsObj);
      const dictionaryObj = dictionaryObject();

      for (const word of words) {
        // Just in case if list of words contains incorrect data
        if (!Object.keys(dictionaryObj).includes(word.charAt(0))) {
          console.error(`Dataset includes incorrect data: ${word}`);
        } else {
          dictionaryObj[`${word.charAt(0)}`].push(word);
        }
      }

      resolve({dictionary: dictionaryObj, allWords: words});
    } catch (error) {
      console.error(error);
      reject(new Error("Loading words failed !"));
    }
  });
};

export const loadAllWords = () => {
  return async (dispatch: any) => {
    try {
      const allWords = await getWords();
      dispatch(allWordsActions.loadWordsSuccess(allWords));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(allWordsActions.loadWordsFailure(error.message));
      }
      dispatch(allWordsActions.loadWordsFailure("Something went wrong :( "));
    }
  };
};

export const filterByPhrase = (phrase: string, dictionary: any) => {
  return async (dispatch: any) => {
    try {
      const filteredWords = await filterBy(phrase, dictionary);
      dispatch(allWordsActions.filterBySuccess(filteredWords));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(allWordsActions.filterByFailure(error.message));
      }
      dispatch(
        allWordsActions.filterByFailure(
          `Error during filtering by phrase: ${phrase}!`
        )
      );
    }
  };
};

async function filterBy(phrase: string, dictionary: any): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (phrase === "") {
      resolve([]);
    }

    try {
      const firstLetter = phrase.charAt(0);
      const items = dictionary[`${firstLetter}`] as string[];

      const regex = getRegexFromPhrase(phrase);
      return resolve(items.filter((item) => item.match(regex)));
    } catch (error) {
      reject(error);
    }
  });
}

function getRegexFromPhrase(phrase: string): RegExp {
  const phraseParts = phrase.replaceAll("*", ",*,").split(",");

  if (phraseParts.length === 1) {
    return new RegExp(`^(${phrase})(\w+)?`);
  }

  const regExpString = phraseParts.reduce((acc, curr) => {
    let nextPart;
    if (curr === "*") {
      nextPart = "\\w";
    } else {
      nextPart = `(${curr})`;
    }
    return acc + nextPart;
  }, "^");

  const completedRegExp = regExpString + "(w+)?";
  return new RegExp(completedRegExp);
}
