import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationModal: false,
  categoryModal: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setLocationModal: (state) => {
      state.locationModal = true;
    },
    unsetLocationModal: (state) => {
      state.locationModal = false;
    },
    setCategoryModal: (state) => {
      state.categoryModal = true;
    },
    unsetCategoryModal: (state) => {
      state.categoryModal = false;
    },
  },
});

export const { setLocationModal, unsetLocationModal, setCategoryModal, unsetCategoryModal } = searchSlice.actions;
export default searchSlice.reducer;
