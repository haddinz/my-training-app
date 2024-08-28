import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slice/contactSlice";
import languageReducer from "./slice/languageSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
