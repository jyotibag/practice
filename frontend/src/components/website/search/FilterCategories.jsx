import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unsetCategoryModal } from "../../../feature/website/search/searchSlice";
import { nanoid } from "nanoid";
import city from "../../../assets/website/img/features/1.svg";
import { setSearchCategory } from "../../../feature/masters/categorySlice";

const FilterCategories = () => {
  const dispatch = useDispatch();
  const { getCategories } = useSelector((store) => store.categories);
  const { categoryModal } = useSelector((store) => store.search);

  const handleClose = () => {
    dispatch(unsetCategoryModal());
  };

  const setCat = (id) => {
    dispatch(setSearchCategory(id));
    dispatch(unsetCategoryModal());
  };

  return (
    <Modal show={categoryModal} size="xl" centered onHide={handleClose}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Search by Location</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="row justify-content-center cursor-pointer">
          {getCategories.map((i) => {
            return (
              <div
                className="col-lg-3 col-sm-4 col-md-6 py-4"
                key={nanoid()}
                onClick={() => setCat(i.id)}
              >
                <img src={city} className="mx-auto d-block" alt="" />
                <p className="text-center fs-6 text-muted">{i.category}</p>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      
    </Modal>
  );
};

export default FilterCategories;
