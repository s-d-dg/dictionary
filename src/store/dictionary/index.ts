import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllWordsDictionary } from "./model";

const initialState: AllWordsDictionary = {
  loading: false,
  words: [],
  phrase: '',
  filteredWords: []
};

const DictionarySlice = createSlice({
  name: "Dictionary",
  initialState,
  reducers: {
    loadWords(state) {
      state.loading = true;
    },
    loadWordsSuccess(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.words = action.payload;
    },
    loadWordsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const allWordsActions = DictionarySlice.actions;

export default DictionarySlice;
