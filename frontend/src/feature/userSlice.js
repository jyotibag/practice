import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUsers: [],
  editId: "",
  editModal: false,
  deleteId: "",
  deleteModal: false,
  viewUser: "",
 
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setListUsers: (state, action) => {
      state.listUsers = action.payload;
    },
    unsetListUsers: (state) => {
      state.listUsers = [];
    },
    setEditUser: (state, action) => {
      state.editModal = true;
      state.editId = action.payload;
    },
    unsetEditUser: (state) => {
      state.editModal = false;
      state.editId = "";
    },
    setDeleteUser: (state, action) => {
      state.deleteModal = true;
      state.deleteId = action.payload;
    },
    unsetDeleteUser: (state) => {
      state.deleteModal = false;
      state.deleteId = "";
    },
    setViewUser: (state, action) => {
      state.viewUser = action.payload;
    },
    unsetViewUser: (state) => {
      state.viewUser = "";
    },
    
  },
});

export const {
  setListUsers,
  unsetListUsers,
  setEditUser,
  unsetEditUser,
  setDeleteUser,
  unsetDeleteUser,
  setViewUser,
  unsetViewUser,
  
} = userSlice.actions;
export default userSlice.reducer;
