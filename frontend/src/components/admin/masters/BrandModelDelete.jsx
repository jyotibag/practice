import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../SubmitBtn";
import { unsetDeleteBrandModel } from "../../../feature/masters/brandModelSlice";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { updateCount } from "../../../feature/commonSlice";

const BrandModelDelete = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { deleteId, deleteModal, listBrandModels } = useSelector(
    (store) => store.models
  );
  const info = listBrandModels?.find((i) => i.id === deleteId);

  const handleClose = () => {
    dispatch(unsetDeleteBrandModel());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await customFetch.delete(`/masters/models/${deleteId}`);
      dispatch(unsetDeleteBrandModel());
      dispatch(updateCount());
      toast.success(`Model deleted`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={deleteModal} size="md" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deactivate {info?.model_name?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <form method="post" onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Sure you wish to deactivate {info?.model_name?.toUpperCase()}?</p>
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

export default BrandModelDelete;
