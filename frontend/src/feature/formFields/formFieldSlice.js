import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listFormFields: [],
  editId: "",
  editModal: false,
  deleteId: "",
  deleteModal: false,
  fieldOptions: [],
  editIndex: "",
  editValue: "",
  deleteIndex: "",
};

const formFieldSlice = createSlice({
  name: "formFields",
  initialState: initialState,
  reducers: {
    setListFormFields: (state, action) => {
      state.listFormFields = action.payload;
    },
    unsetListFormFields: (state) => {
      state.listFormFields = [];
    },
    setEditFormField: (state, action) => {
      state.editId = action.payload;
      state.editModal = true;
    },
    unsetEditFormField: (state) => {
      state.editId = "";
      state.editModal = false;
    },
    setDeleteFormField: (state, action) => {
      state.deleteId = action.payload;
      state.deleteModal = true;
    },
    unsetDeleteFormField: (state) => {
      state.deleteId = "";
      state.deleteModal = false;
    },
    setFieldOptions: (state, action) => {
      state.fieldOptions = action.payload;
    },
    unsetFieldOptions: (state) => {
      state.fieldOptions = [];
    },
    addFieldOption: (state, action) => {
      const newOption = { value: action.payload };
      const newSet = [...state.fieldOptions, newOption];
      state.fieldOptions = newSet;
    },
    editFieldOption: (state, action) => {
      state.editIndex = action.payload.index;
      const val = state.fieldOptions.find(
        (i, index) => index === Number(action.payload.index)
      );
      state.editValue = val;
    },
    updateFieldOption: (state, action) => {
      const newVal = { value: action.payload };
      let arr = state.fieldOptions.filter(
        (i, index) => index !== state.editIndex
      );
      arr = [...arr, newVal];
      state.fieldOptions = arr;
      state.editValue = "";
    },
    unsetEditOption: (state) => {
      state.editValue = "";
    },
    deleteFieldOption: (state, action) => {
      const newSet = state.fieldOptions.filter(
        (i, index) => index !== Number(action.payload.index)
      );
      state.fieldOptions = newSet;
    },
  },
});

export const {
  setListFormFields,
  unsetListFormFields,
  setEditFormField,
  unsetEditFormField,
  setDeleteFormField,
  unsetDeleteFormField,
  setFieldOptions,
  unsetFieldOptions,
  addFieldOption,
  editFieldOption,
  updateFieldOption,
  unsetEditOption,
  deleteFieldOption,
} = formFieldSlice.actions;
export default formFieldSlice.reducer;
