import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../SubmitBtn";
import { Modal } from "react-bootstrap";
import {
  unsetEditFormField,
  unsetFieldOptions,
} from "../../../feature/formFields/formFieldSlice";
import { nanoid } from "nanoid";
import { inputTypes } from "../../../utils/data";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import FieldOptions from "./FieldOptions";
import { updateCount } from "../../../feature/commonSlice";
import { toast } from "react-toastify";

const FieldAddEdit = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    ffCatId: "",
    ffLabel: "",
    ffType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isRequired, setIsRequired] = useState(true);

  const { allCategories } = useSelector((store) => store.categories);
  const { editId, editModal, fieldOptions, listFormFields } = useSelector(
    (store) => store.formFields
  );
  const info = listFormFields?.find((i) => i.id === editId);

  const handleClose = () => {
    setIsRequired(true);
    setForm({ ...form, ffCatId: "", ffLabel: "", ffType: "" });
    dispatch(unsetEditFormField());
    dispatch(unsetFieldOptions());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      isRequired: isRequired ? true : false,
      fieldOptions: fieldOptions,
    };
    const process = editId ? customFetch.put : customFetch.post;
    const api = editId
      ? `/masters/formFields/${editId}`
      : `/masters/formFields`;
    const msg = editId ? `Update details` : `Form field added`;
    try {
      await process(api, data);
      dispatch(updateCount());
      editId ? handleClose() : setForm({ ...form, ffLabel: "", ffType: "" });
      toast.success(msg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  useEffect(() => {
    setIsRequired(editId ? info?.is_required : true);
    setForm({
      ...form,
      ffCatId: editId ? info?.cat_id : "",
      ffLabel: editId ? info?.field_label : "",
      ffType: editId ? info?.field_type : "",
    });
  }, [info]);

  return (
    <Modal show={editModal} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editId ? `Update details` : `Add new form field`}
        </Modal.Title>
      </Modal.Header>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row row-cards">
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="form-label required">Category : </label>
              <select
                className="form-select"
                name="ffCatId"
                id="ffCatId"
                value={form.ffCatId}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {allCategories?.map((i) => {
                  if (i?.parent_id) {
                    return (
                      <option key={nanoid()} value={i.id}>
                        {i.category.toUpperCase()}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0"></div>

            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label
                className="form-label required"
                htmlFor="ffLabel"
                value={form.ffLabel}
                onChange={handleChange}
              >
                Form field label :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="ffLabel"
                id="ffLabel"
                value={form.ffLabel}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="form-label required">Form field type : </label>
              <select
                className="form-select"
                name="ffType"
                id="ffType"
                value={form.ffType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {inputTypes
                  ?.sort((a, b) => a.type.localeCompare(b.type))
                  ?.map((i) => {
                    return (
                      <option key={nanoid()} value={i.type}>
                        {i.type.toUpperCase()}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="mb-1 col-md-6 mt-0 pt-0">
              <label className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="ffIsRequired"
                  checked={isRequired}
                  onChange={() => setIsRequired(!isRequired)}
                />
                <span className="form-label">
                  The above field is required for posting
                </span>
              </label>
            </div>
            {(form.ffType === "dropdown" ||
              form.ffType === "checkbox" ||
              form.ffType === "radio") && (
              <>
                <hr style={{ marginTop: ".5rem", marginBottom: ".5rem" }} />

                <FieldOptions />
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <SubmitBtn
            text={editId ? `Save changes` : `Add form field`}
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

export default FieldAddEdit;
