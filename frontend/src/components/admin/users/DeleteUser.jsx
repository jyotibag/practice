import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unsetDeleteUser } from "../../../feature/userSlice";
import SubmitBtn from "../SubmitBtn";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { splitErrors } from "../../../utils/showErrors";
import { updateCount } from "../../../feature/commonSlice";

const DeleteUser = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { deleteId, deleteModal, listUsers } = useSelector(
    (store) => store.users
  );
  const user = listUsers?.find((i) => i.id === deleteId);

  const handleClose = () => {
    dispatch(unsetDeleteUser());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await customFetch.delete(`/users/delete/${deleteId}`);
      toast.warning(`User deactivated`);
      dispatch(unsetDeleteUser());
      dispatch(updateCount());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <Modal show={deleteModal} size="md" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deactivate {user?.first_name?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <form method="post" onSubmit={handleSubmit}>
        <Modal.Body>
          <p>
            Sure you wish to deactivate {user?.first_name?.toUpperCase()}{" "}
            {user?.last_name?.toUpperCase()} ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <SubmitBtn
            className={`btn btn-danger me-2`}
            text={`Delete`}
            isLoading={isLoading}
          />
          <button
            type="button"
            className="btn btn-default"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DeleteUser;
