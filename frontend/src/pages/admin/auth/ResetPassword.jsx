import React, { useState } from "react";
import logo from "../../../assets/admin/static/logo.svg";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { SubmitBtn } from "../../../components";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

const ResetPassword = () => {
  document.title = `Reset Password | ${import.meta.env.VITE_APP_TITLE}`;
  const navigate = useNavigate();
  const { email, token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    otp: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, emailEnc: email, tokenEnc: token };
    try {
      await customFetch.post(`/auth/reset-password`, data);
      toast.success(`Password updated`);
      navigate(`/sign-in`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

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
          <form
            className="card card-md"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Reset password</h2>
              <div className="mb-3">
                <label className="form-label" htmlFor="otp">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  name="otp"
                  id="otp"
                  value={form.otp}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  New password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="passwordConfirm">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
              <div className="form-footer">
                <SubmitBtn
                  className={`btn btn-primary w-100`}
                  text={`Submit`}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </form>
          <div className="text-center text-muted mt-3">
            Forget it, <Link to="/sign-in">send me back</Link> to the sign in
            screen.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
