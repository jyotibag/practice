import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allStates: [],
  listLocations: [],
  topLocations: [],
  editId: "",
  deleteId: "",
  deleteModal: "",
  searchLocation: "",
};

const locationSlice = createSlice({
  name: "locations",
  initialState: initialState,
  reducers: {
    setAllStates: (state, action) => {
      state.allStates = action.payload;
    },
    unsetAllStates: (state) => {
      state.allStates = [];
    },
    setListLocations: (state, action) => {
      state.listLocations = action.payload;
    },
    unsetListLocations: (state) => {
      state.listLocations = [];
    },
    setTopLocations: (state, action) => {
      state.topLocations = action.payload;
    },
    unsetTopLocations: (state) => {
      state.topLocations = [];
    },
    setEditLocation: (state, action) => {
      state.editId = action.payload;
    },
    unsetEditLocation: (state) => {
      state.editId = "";
    },
    setDeleteLocation: (state, action) => {
      state.deleteId = action.payload;
      state.deleteModal = true;
    },
    unsetDeleteLocation: (state) => {
      state.deleteId = "";
      state.deleteModal = false;
    },
    setSearchLocation: (state, action) => {
      state.searchLocation = action.payload;
    },
    unsetSearchLocation: (state) => {
      state.searchLocation = "";
    },
  },
});

export const {
  setAllStates,
  unsetAllStates,
  setListLocations,
  unsetListLocations,
  setTopLocations,
  unsetTopLocations,
  setEditLocation,
  unsetEditLocation,
  setDeleteLocation,
  unsetDeleteLocation,
  setSearchLocation,
  unsetSearchLocation,
} = locationSlice.actions;
export default locationSlice.reducer;
