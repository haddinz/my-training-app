import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import {
  AddProductType,
  UpdateProductType,
  Product,
} from "../../types/productType";

export const getProduct = createAsyncThunk("product/getProducts", async () => {
  const response = await axios.get("http://localhost:4000/products");
  const data = response.data;

  return data;
});

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ name, price, description, createdAt }: AddProductType) => {
    const response = await axios.post("http://localhost:4000/products", {
      name,
      price,

      description,
      createdAt,
    });

    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string) => {
    await axios.delete(`http://localhost:4000/products/${id}`);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, name, price, description }: UpdateProductType) => {
    const response = await axios.patch(`http://localhost:4000/products/${id}`, {
      name,
      price,

      description,
    });

    return response.data;
  }
);

//kemudahan dalam melakukan selectore dalam selectAll, selectById, dll, berdasarkan id dari product yang telah di tentukan
const productEntry = createEntityAdapter({
  selectId: (product: Product) => product.id,
});

const initialState = productEntry.getInitialState;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        productEntry.setAll(state, action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        productEntry.addOne(state, action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        productEntry.removeOne(state, action.payload);
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          productEntry.updateOne(state, {
            id: action.payload.id,
            changes: action.payload,
          });
        }
      );
  },
});

// merupakan fungsi bagian dari createEntityAdapter
// rootState merupakan seluruh kombinasi dari berbagai slice state
export const productSelectors = productEntry.getSelectors(
  (state: RootState) => state.product
);

export default productSlice.reducer;
