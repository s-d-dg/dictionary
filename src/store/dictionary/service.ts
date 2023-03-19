import { allWordsActions } from "./index";

import wordsObj from "../../assets/data/words_dictionary.json";
import { Dictionary, dictionaryObject } from "./model";

const getWords = async (): Promise<Dictionary> => {
  return new Promise((resolve, reject) => {
    try {
      const words = Object.keys(wordsObj);
      const dictionaryObj = dictionaryObject();

      for (const word of words) {
        // Just in case if list of words contains incorrect data
        if (!Object.keys(dictionaryObj).includes(word.charAt(0))) {
          console.error(`Dataset includes incorrect data: ${word}`);
        } else {
          if (dictionaryObj[`${word.charAt(0)}`].length <= 5000) {
            dictionaryObj[`${word.charAt(0)}`].push(word);
          }
        }
      }

      resolve(dictionaryObj);
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
      return resolve(items.filter((item) => item.includes(phrase)));
    } catch (error) {
      reject(error);
    }
  });
}
