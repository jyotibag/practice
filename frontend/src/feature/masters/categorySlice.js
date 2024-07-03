import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

export const getChildCategory = createAsyncThunk(
  "/categories/sub",
  async (data) => {
    try {
      const response = await customFetch.get(`/masters/categories/sub/${data}`);
      return response?.data?.data?.rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const getFormFields = createAsyncThunk(
  `/posts/form-fields`,
  async (data) => {
    if (data) {
      try {
        const response = await customFetch.get(
          `/masters/form-fields-with-options/${data}`
        );
        return response?.data?.data?.rows;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }
);

const initialState = {
  getCategories: [],
  allCategories: [],
  listCategories: [],
  parentCategories: [],
  childCategories: [],
  editId: "",
  deleteId: "",
  deleteModal: false,
  searchCategory: "",
  formFields: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setGetCategories: (state, action) => {
      state.getCategories = action.payload;
    },
    setSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
    unsetSearchCategory: (state) => {
      state.searchCategory = "";
    },
    setAllCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    unsetAllCategories: (state) => {
      state.allCategories = [];
    },
    setListCategories: (state, action) => {
      state.listCategories = action.payload;
    },
    unsetListCategories: (state) => {
      state.listCategories = [];
    },
    setParentCategories: (state, action) => {
      state.parentCategories = action.payload;
    },
    unsetParentCategories: (state) => {
      state.parentCategories = [];
    },
    setEditCategory: (state, action) => {
      state.editId = action.payload;
    },
    unsetEditCategory: (state) => {
      state.editId = "";
    },
    setDeleteCategory: (state, action) => {
      state.deleteModal = true;
      state.deleteId = action.payload;
    },
    unsetDeleteCategory: (state) => {
      state.deleteModal = false;
      state.deleteId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChildCategory.pending, (state) => {})
      .addCase(getChildCategory.fulfilled, (state, action) => {
        state.childCategories = action.payload;
      })
      .addCase(getChildCategory.rejected, (state) => {})
      .addCase(getFormFields.pending, (state) => {})
      .addCase(getFormFields.fulfilled, (state, action) => {
        state.formFields = action.payload;
      })
      .addCase(getFormFields.rejected, (state) => {});
  },
});

export const {
  setGetCategories,
  setSearchCategory,
  unsetSearchCategory,
  setAllCategories,
  unsetAllCategories,
  setListCategories,
  unsetListCategories,
  setParentCategories,
  unsetParentCategories,
  setEditCategory,
  unsetEditCategory,
  setDeleteCategory,
  unsetDeleteCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
