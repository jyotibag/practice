import React, { useState } from "react";
import logo from "../../../assets/admin/static/logo.svg";
import { Form, Link, useNavigation } from "react-router-dom";
import { GoMail } from "react-icons/go";
import BtnSpinner from "../../../components/admin/BtnSpinner";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

// Action starts ------
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post(`/auth/forgot-password`, data);
    toast.success(`Password reset link is sent to your email`);
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const ForgotPassword = () => {
  document.title = `Forgot Password | ${import.meta.env.VITE_APP_TITLE}`;
  const [userEmail, setUserEmail] = useState("");
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <div className=" d-flex flex-column">
      <div className="page page-center">
        <div className="container container-tight py-4">
          <div className="text-center mb-4">
            <Link to="/sign-in" className="navbar-brand navbar-brand-autodark">
              <img
                src={logo}
                height="36"
                alt={import.meta.env.VITE_APP_TITLE}
              />
            </Link>
          </div>
          <Form className="card card-md" method="post" autoComplete="off">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Forgot password</h2>
              <p className="text-muted mb-4">
                Enter your email address and your password will be reset and
                emailed to you.
              </p>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <BtnSpinner />
                  ) : (
                    <GoMail size={18} className="me-2" />
                  )}
                  Send me new password
                </button>
              </div>
            </div>
          </Form>
          <div className="text-center text-muted mt-3">
            Forget it, <Link to="/sign-in">send me back</Link> to the sign in
            screen.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
