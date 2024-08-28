import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageSlice {
  value: string;
}

const initialState: LanguageSlice = {
  value: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    languageState: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { languageState } = languageSlice.actions;

export default languageSlice.reducer;
