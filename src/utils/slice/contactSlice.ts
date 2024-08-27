import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

import ApiClient from "../getApiClient";
import {
  AddContactType,
  Contact,
  UpdateContactType,
} from "../../types/contactType";

export const getContact = createAsyncThunk("contact/getcontacts", async () => {
  const response = await ApiClient.get("contacts");
  const data = response.data;

  return data;
});

export const addContact = createAsyncThunk(
  "contact/addcontact",
  async ({ name, email, phone, address }: AddContactType) => {
    const response = await ApiClient.post("contacts", {
      name,
      email,
      phone,
      address,
    });

    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deletecontact",
  async (id: string) => {
    await ApiClient.delete(`contacts/${id}`);
    return id;
  }
);

export const updateContact = createAsyncThunk(
  "contact/updatecontact",
  async ({ id, name, email, phone, address }: UpdateContactType) => {
    const response = await ApiClient.patch(`contacts/${id}`, {
      name,
      email,
      phone,
      address,
    });

    return response.data;
  }
);

// kemudahan dalam melakukan selectore dalam selectAll, selectById, dll,
// berdasarkan id dari contact yang telah di tentukan
const contactEntry = createEntityAdapter({
  selectId: (contact: Contact) => contact.id,
});

const initialState = contactEntry.getInitialState;

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContact.fulfilled, (state, action) => {
        contactEntry.setAll(state, action.payload);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        contactEntry.addOne(state, action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        contactEntry.removeOne(state, action.payload);
      })
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          contactEntry.updateOne(state, {
            id: action.payload.id,
            changes: action.payload,
          });
        }
      );
  },
});

// merupakan fungsi bagian dari createEntityAdapter
// rootState merupakan seluruh kombinasi dari berbagai slice state
export const contactSelectors = contactEntry.getSelectors(
  (state: RootState) => state.contact
);

export default contactSlice.reducer;
