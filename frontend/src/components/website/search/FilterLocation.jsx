import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unsetLocationModal } from "../../../feature/website/search/searchSlice";
import { nanoid } from "nanoid";
import city from "../../../assets/website/img/features/1.svg";
import { setSearchLocation } from "../../../feature/masters/locationSlice";

const FilterLocation = () => {
  const dispatch = useDispatch();
  const { topLocations } = useSelector((store) => store.locations);
  const { locationModal } = useSelector((store) => store.search);

  const handleClose = () => {
    dispatch(unsetLocationModal());
  };

  const setSearch = (id) => {
    dispatch(setSearchLocation(id));
    dispatch(unsetLocationModal());
  };

  return (
    <Modal show={locationModal} size="xl" centered onHide={handleClose}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Search by Location</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="row justify-content-center cursor-pointer">
          {topLocations.map((i) => {
            return (
              <div
                className="col-lg-3 col-sm-4 col-md-6 py-4"
                key={nanoid()}
                onClick={() => setSearch(i.id)}
              >
                <img src={city} className="mx-auto d-block" alt="" />
                <p className="text-center fs-6 text-muted">{i.city}</p>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
          <SubmitBtn
            className={`btn btn-warning me-2`}
            text={`Search`}
            isLoading={isLoading}
          />
          <button
            type="button"
            className="btn btn-default"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer> */}
    </Modal>
  );
};

export default FilterLocation;
