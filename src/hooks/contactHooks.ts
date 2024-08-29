import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addContact,
  contactSelectors,
  deleteContact,
  getContact,
  updateContact,
} from "../utils/slice/contactSlice";
import { AddContactType, UpdateContactType } from "../types/contactType";

export const GetContactHooks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(contactSelectors.selectAll);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getContact());
      setIsLoading(false);
    } catch (error) {
      console.log("error : ", error);
      setIsLoading(true);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { isLoading, data };
};

export const AddContactHooks = (contact: AddContactType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const postData = useCallback(async () => {
    try {
      setIsLoading(true);
      dispatch(addContact(contact));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }, [dispatch, contact]);

  return { isLoading, postData };
};

export const UpdateContactHooks = (id: string, contact: UpdateContactType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) =>
    contactSelectors.selectById(state, id ?? "")
  );

  const fecthData = useMemo(() => data, [data]);

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  const updateData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(updateContact(contact));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log("error : ", error);
    }
  }, [contact, dispatch]);

  return { isLoading, fecthData, updateData };
};

export const DeleteContactHooks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const deleteData = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        await dispatch(deleteContact(id));
        setIsLoading(false);
      } catch (error) {
        console.log("error : ", error);
        setIsLoading(true);
      }
    },
    [dispatch]
  );

  return { isLoading, deleteData };
};
