import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AllWordsDictionary, dictionaryObject } from "./model";
import { getAllWords } from "./service";

const initialState: AllWordsDictionary = {
  loading: false,
  dictionary: dictionaryObject(),
  phrase: "",
  filteredWords: [],
};

export const fetchAllWords = createAsyncThunk('Dictionary/fetchAllWords', async () => {
  try {
    const allWords = await getAllWords();
    return Promise.resolve(allWords);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
    return Promise.reject("Something went wrong :( ");
  }
});

const DictionarySlice = createSlice({
  name: "Dictionary",
  initialState,
  reducers: {
    filterBy(state, action: PayloadAction<string>) {
      const phrase = action.payload;
      localStorage.setItem("phrase", phrase);
      state.phrase = phrase;
      state.loading = true;
    },
    filterBySuccess(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.filteredWords = action.payload;
      localStorage.setItem("filteredWords", JSON.stringify(action.payload));
    },
    filterByFailure(state, action: PayloadAction<string>) {
      state.filteredWords = [];
      state.loading = false;
      state.error = action.payload;

      localStorage.removeItem("phrase");
      localStorage.removeItem("filteredWords");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllWords.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllWords.fulfilled, (state, action) => {
        state.loading = false;
        state.dictionary = action.payload.dictionary;
  
        // Get possibly saved data from localStorage on first load
        const phrase = localStorage.getItem("phrase");
        state.phrase = phrase || "";
  
        const stringifiedFilteredWords = localStorage.getItem("filteredWords");
        if (stringifiedFilteredWords !== null) {
          state.filteredWords = JSON.parse(stringifiedFilteredWords);
        }
      })
      .addCase(fetchAllWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const allWordsActions = DictionarySlice.actions;

export default DictionarySlice;
