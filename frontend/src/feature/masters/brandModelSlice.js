import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBrandModels: [],
  allBrandModels: [],
  editId: "",
  deleteId: "",
  deleteModal: "",
};

const brandModelSlice = createSlice({
  name: "models",
  initialState: initialState,
  reducers: {
    setListBrandModels: (state, action) => {
      state.listBrandModels = action.payload;
    },
    unsetListBrandModels: (state) => {
      state.listBrandModels = [];
    },
    setAllBrandsModels: (state, action) => {
      state.allBrandModels = action.payload;
    },
    unsetAllBrandsModels: (state) => {
      state.allBrandModels = [];
    },
    setEditBrandModel: (state, action) => {
      state.editId = action.payload;
    },
    unsetEditBrandModel: (state) => {
      state.editId = "";
    },
    setDeleteBrandModel: (state, action) => {
      state.deleteId = action.payload;
      state.deleteModal = true;
    },
    unsetDeleteBrandModel: (state) => {
      state.deleteId = "";
      state.deleteModal = false;
    },
  },
});

export const {
  setListBrandModels,
  unsetListBrandModels,
  setAllBrandsModels,
  unsetAllBrandsModels,
  setEditBrandModel,
  unsetEditBrandModel,
  setDeleteBrandModel,
  unsetDeleteBrandModel,
} = brandModelSlice.actions;
export default brandModelSlice.reducer;
