import React from "react";
import { Outlet } from "react-router-dom";

import "../../assets/website/css/bootstrap.min.css";
import "../../assets/website/css/style.css";
import "../../assets/website/css/abc.css";
import "../../assets/website/css/resposive.css";

import { WbSecondNav, WbTopnav } from "../../components";
import WbFooter from "../../components/website/WbFooter";
import { splitErrors } from "../../utils/showErrors";
import customFetch from "../../utils/customFetch";
import { setTopLocations } from "../../feature/masters/locationSlice";
import { setGetCategories } from "../../feature/masters/categorySlice";
import { useSelector } from "react-redux";

export const loader = (store) => async () => {
  const { topLocations } = store.getState().locations;
  const { getCategories } = store.getState().categories;
  try {
    if (topLocations.length === 0) {
      const tLoc = await customFetch.get(`/website/top-locations`);
      store.dispatch(setTopLocations(tLoc?.data?.data?.rows));
    }

    if (getCategories.length === 0) {
      const sCat = await customFetch.get(`/website/get-categories`);
      store.dispatch(setGetCategories(sCat?.data?.data?.rows));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return null;
  }
};

const LayoutWebsite = () => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <>
      {!currentUser.currentUser.uuid ? <WbTopnav /> : ""}
      <WbSecondNav />
      <main>
        <Outlet />
      </main>
      <WbFooter />
    </>
  );
};

export default LayoutWebsite;
