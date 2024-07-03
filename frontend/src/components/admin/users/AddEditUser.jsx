import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../SubmitBtn";
import { unsetEditUser } from "../../../feature/userSlice";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { updateCount } from "../../../feature/commonSlice";
import { toast } from "react-toastify";
import { setCurrentUser } from "../../../feature/currentUserSlice";

const AddEditUser = () => {
  const dispatch = useDispatch();
  const { editModal, editId, listUsers } = useSelector((store) => store.users);
  const { currentUser } = useSelector((store) => store.currentUser);
  const { listRoles } = useSelector((store) => store.roles);
  const user = listUsers?.find((i) => i.id === editId);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    roleId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    dispatch(unsetEditUser());
  };

  useEffect(() => {
    setForm({
      ...form,
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      roleId: user?.role_id || "",
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const processMethod = editId ? customFetch.put : customFetch.post;
    const processApi = editId ? `/users/update/${editId}` : `/users/add`;
    const successMsg = editId ? `Details updated` : `Member added`;

    try {
      const response = await processMethod(processApi, data);

      if (currentUser.id === editId) {
        const user = await customFetch.get(`/auth/current-user`);
        dispatch(setCurrentUser(user.data.data.rows[0]));
      }

      dispatch(unsetEditUser());
      dispatch(updateCount());

      setForm({
        ...form,
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        roleId: "",
      });

      toast.success(successMsg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <Modal show={editModal} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editId
            ? `${user?.first_name?.toUpperCase()} ${user?.last_name?.toUpperCase()}`
            : `Add new user`}
        </Modal.Title>
      </Modal.Header>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row row-cards">
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="form-label required" htmlFor="firstName">
                First name :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="form-label required" htmlFor="lastName">
                Last name :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="form-label required" htmlFor="email">
                Email :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="form-label required" htmlFor="mobile">
                Mobile :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                id="mobile"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="form-label required">Role : </label>
              <select
                className="form-control"
                name="roleId"
                id="roleId"
                value={form.roleId}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {listRoles?.map((i) => {
                  return (
                    <option key={nanoid()} value={i.id}>
                      {i.role.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <SubmitBtn
            text={editId ? `Save changes` : `Add user`}
            isLoading={isLoading}
          />
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddEditUser;
