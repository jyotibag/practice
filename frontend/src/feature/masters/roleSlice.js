import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listRoles: [],
};

const roleSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {
    setListRoles: (state, action) => {
      state.listRoles = action.payload;
    },
    unsetListRoles: (state) => {
      state.listRoles = [];
    },
  },
});

export const { setListRoles, unsetListRoles } = roleSlice.actions;
export default roleSlice.reducer;
