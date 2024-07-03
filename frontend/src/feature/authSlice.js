import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tncModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setTncModal: (state) => {
      state.tncModal = true;
    },
    unsetTncModal: (state) => {
      state.tncModal = false;
    },
  },
});

export const { setTncModal, unsetTncModal } = authSlice.actions;
export default authSlice.reducer;
