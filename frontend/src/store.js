import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import commonReducer from "./feature/commonSlice";
import currentUserReducer from "./feature/currentUserSlice";
import userReducer from "./feature/userSlice";
import roleReducer from "./feature/masters/roleSlice";
import categoryReducer from "./feature/masters/categorySlice";
import brandReducer from "./feature/masters/brandSlice";
import brandModelReducer from "./feature/masters/brandModelSlice";
import locationReducer from "./feature/masters/locationSlice";
import formFieldReducer from "./feature/formFields/formFieldSlice";
// Website related ------
import searchReducer from "./feature/website/search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    currentUser: currentUserReducer,
    users: userReducer,
    roles: roleReducer,
    categories: categoryReducer,
    brands: brandReducer,
    models: brandModelReducer,
    locations: locationReducer,
    formFields: formFieldReducer,
    //Website related ------
    search: searchReducer,
  },
});
