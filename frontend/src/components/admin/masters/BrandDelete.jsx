import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllBrands,
  unsetDeleteBrand,
} from "../../../feature/masters/brandSlice";
import SubmitBtn from "../SubmitBtn";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { updateCount } from "../../../feature/commonSlice";

const BrandDelete = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { deleteId, deleteModal, allBrands } = useSelector(
    (store) => store.brands
  );
  const info = allBrands?.find((i) => i.id === deleteId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await customFetch.delete(`/masters/brands/${deleteId}`);
      dispatch(updateCount());
      dispatch(unsetDeleteBrand());

      const abrands = await customFetch.get(`/masters/brands/all`);
      dispatch(setAllBrands(abrands.data.data.rows));

      toast.success(`Brand deleted`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const handleClose = () => {
    dispatch(unsetDeleteBrand());
  };

  return (
    <Modal show={deleteModal} size="md" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deactivate {info?.brand?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <form method="post" onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Sure you wish to deactivate {info?.brand?.toUpperCase()}?</p>
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

export default BrandDelete;
