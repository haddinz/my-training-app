import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import {
  addProduct,
  deleteProduct,
  getProduct,
  productSelectors,
  updateProduct,
} from "../utils/slice/productSlice";
import { useCallback, useEffect, useState } from "react";
import { AddProductType, UpdateProductType } from "../types/productType";

export const GetProductHooks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(productSelectors.selectAll);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getProduct());
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

export const AddProductHooks = (product: AddProductType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const postData = useCallback(async () => {
    try {
      setIsLoading(true);
      dispatch(addProduct(product));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }, [dispatch, product]);

  return { isLoading, postData };
};

export const UpdateProductHooks = (id: string, product: UpdateProductType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) =>
    productSelectors.selectById(state, id ?? "")
  );

  useEffect(() => {
    dispatch(getProduct);
  }, [dispatch]);

  const updateData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(updateProduct(product));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error : ", error);
    }
  }, [dispatch, product]);

  return { isLoading, data, updateData };
};

export const DeleteProductHooks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const deleteData = useCallback( async (id: string) => {
    try {
      setIsLoading(true);
      await dispatch(deleteProduct(id));
      setIsLoading(false);
    } catch (error) {
      console.log("error : ", error);
      setIsLoading(true);
    }
  }, [dispatch]);

  return { isLoading, deleteData };
};
