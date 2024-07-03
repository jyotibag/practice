import { useState } from "react";
import { Form } from "react-router-dom";

export const Changepassaction = async ({ request }) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  console.log(data);
};

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div
            className="card"
            style={{ marginTop: "82px", marginBottom: "40px" }}
          >
            <div className="card-body">
              <Form method="post" autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={form.currentPassword}
                    placeholder="Enter your current password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={form.newPassword}
                    placeholder="Enter your new password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    placeholder="Confirm your new password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
