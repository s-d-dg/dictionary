import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllWordsDictionary, Dictionary, dictionaryObject } from "./model";

const initialState: AllWordsDictionary = {
  loading: false,
  dictionary: dictionaryObject(),
  phrase: "",
  filteredWords: [],
};

const DictionarySlice = createSlice({
  name: "Dictionary",
  initialState,
  reducers: {
    loadWords(state) {
      state.loading = true;
    },
    loadWordsSuccess(state, action: PayloadAction<Dictionary>) {
      state.loading = false;
      state.dictionary = action.payload;
    },
    loadWordsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    filterBy(state, action: PayloadAction<string>) {
      const phrase = action.payload;
      state.filteredWords = filterBy(phrase, state.dictionary);
    },
  },
});

export const allWordsActions = DictionarySlice.actions;

export default DictionarySlice;



function filterBy(phrase: string, dictionary: any): string[] {
  if (phrase === "") {
    return [];
  }
  const firstLetter = phrase.charAt(0);

  const items = dictionary[`${firstLetter}`] as string[];
  return items.filter((item) => item.includes(phrase));
}
