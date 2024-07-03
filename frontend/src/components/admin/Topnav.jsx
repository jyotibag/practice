import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import avatar from "../../assets/admin/static/avatars/000m.jpg";
import { useSelector } from "react-redux";

const Topnav = ({ logout }) => {
  const { currentUser } = useSelector((store) => store.currentUser);
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    const theme = newTheme === true ? "dark" : "";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-bs-theme", theme);
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"));
  }, [darkTheme]);

  return (
    <header className="navbar navbar-expand-md d-none d-lg-flex d-print-none">
      <div className="container-xl">
        <div className="navbar-nav flex-row order-md-last">
          <div className="d-none d-md-flex">
            {darkTheme ? (
              <IoIosSunny
                className="nav-link px-0 cursor-pointer mt-2 me-3"
                title="Enable light mode"
                onClick={toggleTheme}
              />
            ) : (
              <FaMoon
                className="nav-link px-0 cursor-pointer mt-2 me-3"
                title="Enable dark mode"
                onClick={toggleTheme}
              />
            )}
          </div>
          <div className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <img
                src={avatar}
                alt={import.meta.env.VITE_SITE_TITLE}
                className="avatar avatar-sm"
              />
              <div className="d-none d-xl-block ps-2">
                <div>{`${currentUser?.first_name?.toUpperCase()} ${currentUser?.last_name?.toUpperCase()}`}</div>
                <div className="mt-1 small text-secondary fs-6">
                  {currentUser?.role?.toUpperCase()}
                </div>
              </div>
            </Link>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <NavLink to="/profile" className="dropdown-item">
                Profile
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink to="/profile" className="dropdown-item">
                Profile
              </NavLink>
              <NavLink to="/change-password" className="dropdown-item">
                Change Password
              </NavLink>
              <button type="button" className="dropdown-item" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Topnav;
