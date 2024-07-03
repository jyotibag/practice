import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { splitErrors } from "../../utils/showErrors";
import customFetch from "../../utils/customFetch";

const LayoutUser = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSlug = async () => {
      try {
        await customFetch.get(`/auth/restrict/${slug}`);
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        navigate("/forbidden");
      }
    };
    checkUserSlug();
  }, [pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutUser;
