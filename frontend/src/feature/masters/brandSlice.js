import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

const initialState = {
  listBrands: [],
  allBrands: [],
  catBrands: [],
  editId: "",
  deleteId: "",
  deleteModal: "",
  isLoading: false,
};

export const getBrands = createAsyncThunk("/masters/brands", async (data) => {
  try {
    if (data) {
      const response = await customFetch.get(
        `/masters/brands/category/${data}`
      );
      return response.data.data.rows;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
});

const brandSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {
    setListBrand: (state, action) => {
      state.listBrands = action.payload;
    },
    unsetListBrand: (state) => {
      state.listBrands = [];
    },
    setAllBrands: (state, action) => {
      state.allBrands = action.payload;
    },
    unsetAllBrands: (state) => {
      state.allBrands = [];
    },
    setEditBrand: (state, action) => {
      state.editId = action.payload;
    },
    unsetEditBrand: (state) => {
      state.editId = "";
    },
    setDeleteBrand: (state, action) => {
      state.deleteId = action.payload;
      state.deleteModal = true;
    },
    unsetDeleteBrand: (state) => {
      state.deleteId = "";
      state.deleteModal = false;
    },
    unsetCatBrands: (state) => {
      state.catBrands = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catBrands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.catBrands = action.payload;
      });
  },
});

export const {
  setListBrand,
  unsetListBrand,
  setAllBrands,
  unsetAllBrands,
  setEditBrand,
  unsetEditBrand,
  setDeleteBrand,
  unsetDeleteBrand,
  unsetCatBrands,
} = brandSlice.actions;
export default brandSlice.reducer;
