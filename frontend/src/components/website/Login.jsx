import { useState } from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { splitErrors } from "../../utils/showErrors";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import SocialSvg from "./landing/SocialSvg";
import loginImage from "../../assets/website/img/others/1.png";

// Action function for form submission
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
      case 2:
        path = `/admin/dashboard`;
        break;
      case 3:
        path = `/${slug}`;
        break;
      default:
        path = `/`;
        break;
    }
    return redirect(`${path}`);
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

export default function Login() {
  document.title = `Login | ${import.meta.env.VITE_APP_TITLE}`;
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [textType, setTextType] = useState("password");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setTextType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <>
      <section className="w-breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div
                className="position-relative z-2"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
              >
                <h2 className="section-title-light mb-2">Sign In</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb w-breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Login
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-110 bg-offWhite">
        <div className="container">
          <div className="bg-white rounded-3 p-3">
            <div className="row g-4">
              <div className="col-lg-6 p-3 p-lg-5">
                <div className="mb-40">
                  <h2 className="section-title mb-2">Log in</h2>
                  <p className="section-desc">Welcome to Work Zone</p>
                </div>
                <Form method="post" autoComplete="off">
                  <div className="form-container d-flex flex-column gap-4">
                    <div className="form-input">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-lime-300">*</span>
                      </label>
                      <input
                        type="email"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="form-control shadow-none"
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="password" className="form-label">
                        Password <span className="text-lime-300">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={textType}
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="********"
                          className="form-control shadow-none"
                        />
                        <span
                          className="input-group-text cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          <MdOutlineRemoveRedEye
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2 form-input">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          name="remember"
                          className="form-check"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="form-check-label"
                        >
                          Remember Me
                        </label>
                      </div>
                      <div>
                        <a href="#" className="form-forget-pass">
                          Forget Password
                        </a>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="w-btn-secondary-lg bluebg_btn"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging In..." : "Log In"}
                      </button>
                    </div>
                  </div>
                </Form>
                <div className="py-5">
                  <div className="form-divider d-flex justify-content-center align-items-center">
                    <span className="form-divider-text">OR</span>
                  </div>
                </div>
                <div className="d-flex gap-3 justify-content-center align-items-center social-login">
                  <SocialSvg type="LinkedIn" className="social-login-item" />
                  <SocialSvg type="Twitter" className="social-login-item" />
                  <SocialSvg type="Google" className="social-login-item" />
                </div>
                <div className="mt-4">
                  <p className="text-center form-text">
                    Don’t have an account? <Link to="/sign-up">Sign up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
