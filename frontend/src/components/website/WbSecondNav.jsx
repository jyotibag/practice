import React, {useState} from "react";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CategoryModal from "./CategoryModal";

const WbSecondNav = () => {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-none d-xl-block secondary-nav-wrapper">
      <div className="container">
        <div className="position-relative">
          <nav className="secondary-nav-container position-absolute w-100 start-0 z-3">
            <ul className="secondary-nav d-flex justify-content-between align-items-center">
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Technology
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Graphics
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Marketing
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Writing
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Translation
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Animation
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Audio
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Branding
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Website
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Programming
                </Link>
              </li>
              <li>
                <Link to={`#`} className="text-decoration-none">
                  Business
                </Link>
              </li>
              <li>
                <button type="button" onClick={handleOpenModal}>
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="19" cy="19" r="19" fill="#F7F5F0" />
                    <path
                      d="M17 19C17 20.0178 17.8283 20.8461 18.8462 20.8461C19.864 20.8461 20.6923 20.0178 20.6923 19C20.6923 17.9821 19.864 17.1538 18.8462 17.1538C17.8283 17.1538 17 17.9821 17 19Z"
                      fill="#06131C"
                    />
                    <path
                      d="M17 25.1538C17 26.1716 17.8283 26.9999 18.8462 26.9999C19.864 26.9999 20.6923 26.1716 20.6923 25.1538C20.6923 24.1359 19.864 23.3076 18.8462 23.3076C17.8283 23.3076 17 24.1359 17 25.1538Z"
                      fill="#06131C"
                    />
                    <path
                      d="M17 12.8462C17 13.864 17.8283 14.6923 18.8462 14.6923C19.864 14.6923 20.6923 13.864 20.6923 12.8462C20.6923 11.8283 19.864 11 18.8462 11C17.8283 11 17 11.8283 17 12.8462Z"
                      fill="#06131C"
                    />
                  </svg>
                </button>
                <CategoryModal show={showModal} handleClose={handleCloseModal} title="All Categories"/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default WbSecondNav;
