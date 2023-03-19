import { configureStore } from "@reduxjs/toolkit";
import DictionarySlice from "./dictionary";

const store = configureStore({
  reducer: {
    dictionary: DictionarySlice.reducer,
  },
});

export default store;
