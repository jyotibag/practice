import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SubmitBtn from "../SubmitBtn";
import { useDispatch, useSelector } from "react-redux";
import { unsetDeleteCategory } from "../../../feature/masters/categorySlice";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { updateCount } from "../../../feature/commonSlice";
import { toast } from "react-toastify";

const CategoryDelete = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { deleteModal, deleteId, listCategories } = useSelector(
    (store) => store.categories
  );

  const info = listCategories?.find((i) => i.id === deleteId);

  const handleClose = () => {
    dispatch(unsetDeleteCategory());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await customFetch.delete(`/masters/categories/${deleteId}`);

      dispatch(unsetDeleteCategory());
      dispatch(updateCount());

      toast.success(`Category deleted`);
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
        <Modal.Title>Deactivate {info?.category?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <form method="post" onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Sure you wish to deactivate {info?.category?.toUpperCase()}?</p>
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

export default CategoryDelete;
