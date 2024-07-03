import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    unsetCurrentUser: (state) => {
      state.currentUser = "";
    },
  },
});

export const { setCurrentUser, unsetCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
