import React, { useState } from "react";
import logo from "../../../assets/admin/static/logo.svg";
import loginBg from "../../../assets/admin/static/login-bg.jpg";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { SubmitBtn } from "../../../components";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { toast } from "react-toastify";
import { FaFacebook, FaGoogle } from "react-icons/fa";

// Action starts ------
export const action = async ({ request }) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  data =
    data.remember === "on"
      ? { ...data, remember: true }
      : { ...data, remember: false };
  try {
    const response = await customFetch.post(`/auth/login`, data);

    const name = response?.data?.data?.first_name;
    const slug = response?.data?.data?.slug;
    const role = response?.data?.data?.role_id;

    toast.success(`Welcome ${name}`);

    let path = "";
    switch (role) {
      case 1:
        path = `/admin/dashboard`;
        break;
      case 2:
        path = `/admin/dashboard`;
        break;
      case 3:
        path = `/${slug}/dashboard`;
        break;
    }
    return redirect(`${path}`);
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const Login = () => {
  document.title = `Login | ${import.meta.env.VITE_APP_TITLE}`;
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [textType, setTextType] = useState("password");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column bg-white">
      <div className="row g-0 flex-fill">
        <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
          <div className="container container-tight my-5 px-lg-5">
            <div className="text-center mb-4">
              <Link to={`#`} className="navbar-brand navbar-brand-autodark">
                <img
                  src={logo}
                  height="36"
                  alt={import.meta.env.VITE_APP_TITLE}
                />
              </Link>
            </div>
            <h2 className="h3 text-center mb-3">Login to your account</h2>
            <Form method="post" autoComplete="off">
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Password
                  <span className="form-label-description">
                    <Link to="/forgot-password">I forgot password</Link>
                  </span>
                </label>
                <div className="input-group input-group-flat">
                  <input
                    type={textType}
                    className="form-control"
                    placeholder="Your password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span className="input-group-text">
                    <MdOutlineRemoveRedEye
                      className="link-secondary cursor-pointer"
                      title="Show password"
                      size={18}
                      onClick={() =>
                        setTextType(
                          textType === "password" ? "text" : "password"
                        )
                      }
                    />
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="remember"
                  />
                  <span className="form-check-label">
                    Remember me on this device
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <SubmitBtn
                  className={`btn btn-primary w-100`}
                  text={`Sign in`}
                  isLoading={isLoading}
                />
              </div>
            </Form>
            <div className="text-center text-muted mt-3">
              Don't have account yet? <Link to="/sign-up">Sign up</Link>
            </div>
            {/* <div className="hr-text">or</div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <Link to={`#`} className="btn w-100">
                    <FaFacebook className="icon text-facebook" />
                    Login with Facebook
                  </Link>
                </div>
                <div className="col">
                  <Link to={`#`} className="btn w-100">
                    <FaGoogle size={20} className="me-2" />
                    Login with Google
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
          <img
            src={loginBg}
            className="bg-cover h-100 min-vh-100"
            alt={import.meta.env.VITE_APP_TITLE}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
