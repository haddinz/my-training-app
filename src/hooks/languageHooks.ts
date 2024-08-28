import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { useCallback } from "react";
import { languageState } from "../utils/slice/languageSlice";
import { useTranslation } from "react-i18next";

export const GetLanguageHooks = (value: string) => {
  const { i18n } = useTranslation();
  const data = useSelector((state: RootState) => state.language.value);
  const dispatch = useDispatch<AppDispatch>();

  const postData = useCallback( async () => {
    dispatch(languageState(data));
    await i18n.changeLanguage(value);
  }, [data, dispatch, i18n, value]);

  return { postData };
};
