import React, { useState } from "react";
import logo from "../../../assets/admin/static/logo.svg";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { SubmitBtn } from "../../../components";
import TncModal from "./TncModal";
import { useDispatch } from "react-redux";
import { setTncModal } from "../../../feature/authSlice";
import { toast } from "react-toastify";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";

// Action starts ------
export const action = async ({ request }) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  data = { ...data, tnc: data.tnc === "on" ? true : false };
  try {
    await customFetch.post(`/auth/register`, data);
    toast.success(`Welcome to Easy Lending Buddy`);
    return redirect("/sign-in");
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const Register = () => {
  document.title = `Join the Family | ${import.meta.env.VITE_APP_TITLE}`;
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const dispatch = useDispatch();
  const [textType, setTextType] = useState("password");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className=" d-flex flex-column">
      <div className="page page-center">
        <div className="container container-tight py-4">
          <div className="text-center mb-4">
            <Link to={`#`} className="navbar-brand navbar-brand-autodark">
              <img
                src={logo}
                height="36"
                alt={import.meta.env.VITE_APP_TITLE}
              />
            </Link>
          </div>
          <Form className="card card-md" method="post" autoComplete="off">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Create new account
              </h2>
              <div className="mb-3">
                <label className="form-label required" htmlFor="firstName">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="firstName"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label required" htmlFor="lastName">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter last name"
                  name="lastName"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label required" htmlFor="email">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label required" htmlFor="mobile">
                  Mobile no.
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile no."
                  name="mobile"
                  id="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label required" htmlFor="password">
                  Password
                </label>
                <div className="input-group input-group-flat">
                  <input
                    type={textType}
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    id="password"
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
              <div className="mb-3">
                <label
                  className="form-label required"
                  htmlFor="passwordConfirm"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="tnc"
                  />
                  <span className="form-check-label">
                    Agree the{" "}
                    <Link to={`#`} onClick={() => dispatch(setTncModal())}>
                      terms and policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <SubmitBtn
                  className={`btn btn-primary w-100`}
                  text={`Join the family`}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </Form>
          <div className="text-center text-muted mt-3">
            Already have account? <Link to="/sign-in">Sign in</Link>
          </div>
        </div>
      </div>
      <TncModal />
    </div>
  );
};

export default Register;
