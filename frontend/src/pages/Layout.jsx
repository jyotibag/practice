import React from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";

import "../assets/admin/dist/css/tabler.min.css";
import "../assets/admin/dist/css/demo.min.css";

import "../assets/admin/dist/js/tabler.min.js";
import "../assets/admin/dist/js/demo.min.js";

import customFetch from "../utils/customFetch.js";
import { splitErrors } from "../utils/showErrors.jsx";
import {
  setCurrentUser,
  unsetCurrentUser,
} from "../feature/currentUserSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  AdminSidebar,
  UserSidebar,
  Topnav,
  Footer,
  WbTopnav,
} from "../components";
import WbFooter from "../components/website/WbFooter.jsx";

// Loader starts ------
export const loader = (store) => async () => {
  const { currentUser } = store.getState().currentUser;

  try {
    if (!currentUser.first_name) {
      const response = await customFetch.get(`/auth/current-user`);
      store.dispatch(setCurrentUser(response.data.data.rows[0]));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/sign-in");
  }
};

// Main component starts ------
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.currentUser);

  const logout = async () => {
    try {
      await customFetch.get(`/auth/logout`);

      dispatch(unsetCurrentUser());
      localStorage.removeItem("token");

      toast.success(`Thank you for visiting`);

      navigate(`/sign-in`);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <>
      {currentUser.role_id === 1 || currentUser.role_id === 2 ? (
        <>
          <Topnav logout={logout} />
          <AdminSidebar />
        </>
      ) : (
        <>
          <WbTopnav logout={logout} />
          {/* <UserSidebar /> */}
        </>
      )}
      <div className="page-wrapper">
        <Outlet />
        {currentUser.role_id === 1 || currentUser.role_id === 2 ? (
          <Footer />
        ) : (
          <WbFooter />
        )}
      </div>
    </>
  );
};

export default Layout;
