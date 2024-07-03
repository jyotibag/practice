import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/admin/static/logo.svg";

const TableLoader = () => {
  return (
    <div className="page page-center vh-80">
      <div className="container container-slim py-4">
        <div className="text-center">
          <div className="mb-3">
            <Link to={`#`} className="navbar-brand navbar-brand-autodark">
              <img src={logo} alt={import.meta.env.VITE_SITE_TITLE} />
            </Link>
          </div>
          <h3 className="text-muted mb-3">Loading data ...</h3>
          <div className="progress progress-sm">
            <div className="progress-bar progress-bar-indeterminate"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLoader;
