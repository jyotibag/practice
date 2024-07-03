import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Forbidden = () => {
  document.title = `Forbidden | ${import.meta.env.VITE_SITE_TITLE}`;
  const { currentUser } = useSelector((store) => store.currentUser);
  let returnUrl = "";
  switch (currentUser.role_id) {
    case 1:
      returnUrl = `/admin/dashboard`;
      break;
    case 2:
      returnUrl = `/admin/dashboard`;
      break;
    case 3:
      returnUrl = `/${currentUser.slug}/dashboard`;
      break;
  }

  return (
    <div className="page page-center">
      <div className="container-tight py-4">
        <div className="empty">
          <div className="empty-header">403</div>
          <p className="empty-title">Oops… You just found an error page</p>
          <p className="empty-subtitle text-muted">
            We are sorry but the page you are looking for was not found
          </p>
          <div className="empty-action">
            <Link to={returnUrl} className="btn btn-primary">
              {/* <!-- Download SVG icon from http://tabler-icons.io/i/arrow-left --> */}
              <FaArrowLeftLong className="me-2" />
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
