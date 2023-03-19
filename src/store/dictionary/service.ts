import { allWordsActions } from "./index";

import wordsObj from "../../assets/data/words_dictionary.json";
import { Dictionary } from "./model";

const getWords = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      const words = Object.keys(wordsObj);
      // ----------- for future optimization ------------------
      // const dictionaryObj = dictionaryObject();
      // const start = Date.now();
      // for (const word of words) {
      //   if (!Object.keys(dictionaryObj).includes(word.charAt(0))) {
      //     console.log(word);
      //   } else {
      //     dictionaryObj[`${word.charAt(0)}`].push(word);
      //   }
      // }
      // const stop = Date.now();
      // console.log(`miliseconds elapsed = ${Math.floor(stop - start)}`);
      // console.log(dictionaryObj);
      // ----------- for future optimization ------------------

      resolve(words);
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
