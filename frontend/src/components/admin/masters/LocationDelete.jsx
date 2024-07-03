import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unsetDeleteLocation } from "../../../feature/masters/locationSlice";
import { splitErrors } from "../../../utils/showErrors";
import SubmitBtn from "../SubmitBtn";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { updateCount } from "../../../feature/commonSlice";

const LocationDelete = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { deleteId, deleteModal, listLocations } = useSelector(
    (store) => store.locations
  );
  const info = listLocations?.find((i) => i.id === deleteId);

  const handleClose = () => {
    dispatch(unsetDeleteLocation());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await customFetch.delete(`/masters/locations/${deleteId}`);

      dispatch(unsetDeleteLocation());
      dispatch(updateCount());

      toast.success(`Location deleted`);
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
        <Modal.Title>Deactivate {info?.city?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <form method="post" onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Sure you wish to deactivate {info?.city?.toUpperCase()}?</p>
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

export default LocationDelete;
