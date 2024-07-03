import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unsetTncModal } from "../../../feature/authSlice";

const TncModal = () => {
  const { tncModal } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(unsetTncModal());
  };

  return (
    <Modal show={tncModal} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="fs-3">Just some formalities!</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li className="mb-3">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </li>
          <li className="mb-3">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </li>
          <li className="mb-3">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </li>
          <li className="mb-3">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TncModal;
