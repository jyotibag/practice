import React from "react";
import { Outlet } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { setListRoles } from "../../feature/masters/roleSlice";
import {
  setAllCategories,
  setParentCategories,
} from "../../feature/masters/categorySlice";
import { setAllBrands } from "../../feature/masters/brandSlice";
import { setAllStates } from "../../feature/masters/locationSlice";

// Loader starts ------
export const loader = (store) => async () => {
  const { listRoles } = store.getState().roles;
  const { allCategories, parentCategories } = store.getState().categories;
  const { allBrands } = store.getState().brands;
  const { allStates } = store.getState().locations;

  try {
    if (listRoles.length === 0) {
      const roleResponse = await customFetch.get(`/masters/roles`);
      store.dispatch(setListRoles(roleResponse.data.data.rows));
    }

    if (allCategories.length === 0) {
      const acategories = await customFetch.get(`/masters/categories/all`);
      store.dispatch(setAllCategories(acategories.data.data.rows));

      const pcategories = await customFetch.get(`/masters/categories/parents`);
      store.dispatch(setParentCategories(pcategories.data.data.rows));
    }

    if (allBrands.length === 0) {
      const abrands = await customFetch.get(`/masters/brands/all`);
      store.dispatch(setAllBrands(abrands.data.data.rows));
    }

    if (allStates.length === 0) {
      const astates = await customFetch.get(`/masters/locations/states`);
      store.dispatch(setAllStates(astates.data.data.rows));
    }
    return null;
  } catch (error) {
    return error;
  }
};

// Main component starts ------
const LayoutAdmin = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutAdmin;
