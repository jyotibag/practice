import React from "react";
import logo from "../../assets/admin/static/logo-white.svg";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdOutlineFormatIndentIncrease } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";

const AdminSidebar = () => {
  return (
    <aside
      className="navbar navbar-vertical navbar-expand-lg"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <h1 className="navbar-brand navbar-brand-autodark">
          <Link to={`/admin/dashboard`}>
            <img
              src={logo}
              style={{ height: "40px" }}
              alt={import.meta.env.VITE_APP_TITLE}
            />
          </Link>
        </h1>
        <div className="collapse navbar-collapse" id="sidebar-menu">
          <ul className="navbar-nav pt-lg-3">
            <li className="nav-item">
              <NavLink className="nav-link" to={`/admin/dashboard`}>
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <AiOutlineHome size={18} />
                </span>
                <span className="nav-link-title">Home</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#navbar-extra"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <FaCog size={18} />
                </span>
                <span className="nav-link-title">Masters</span>
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <NavLink
                      to="/admin/masters/categories"
                      className="dropdown-item"
                    >
                      Categories
                    </NavLink>
                  </div>
                </div>
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <NavLink
                      to="/admin/masters/brands"
                      className="dropdown-item"
                    >
                      Brands
                    </NavLink>
                  </div>
                </div>
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <NavLink
                      to="/admin/masters/models"
                      className="dropdown-item"
                    >
                      Models
                    </NavLink>
                  </div>
                </div>
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <NavLink
                      to="/admin/masters/locations"
                      className="dropdown-item"
                    >
                      Locations
                    </NavLink>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#navbar-extra"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <MdOutlineFormatIndentIncrease size={18} />
                </span>
                <span className="nav-link-title">Form Builder</span>
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <NavLink
                      to="/admin/masters/form-fields"
                      className="dropdown-item"
                    >
                      Form Fields
                    </NavLink>
                  </div>
                </div>
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <NavLink
                      to="/admin/masters/options"
                      className="dropdown-item"
                    >
                      Form Field Options
                    </NavLink>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/admin/users`}>
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <FiUsers size={18} />
                </span>
                <span className="nav-link-title">Users</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/admin/posts`}>
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <MdOutlineAdd size={18} />
                </span>
                <span className="nav-link-title">Posts</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
