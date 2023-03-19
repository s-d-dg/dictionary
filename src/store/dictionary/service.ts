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
          // temporary 'optimization'
          if (dictionaryObj[`${word.charAt(0)}`].length <= 500) {
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
