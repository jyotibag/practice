import React, { useEffect, useState } from "react";
import SubmitBtn from "../SubmitBtn";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { useDispatch, useSelector } from "react-redux";
import { updateCount } from "../../../feature/commonSlice";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import {
  setAllCategories,
  unsetEditCategory,
} from "../../../feature/masters/categorySlice";

const CategoryAddEdit = () => {
  const { allCategories, editId } = useSelector((store) => store.categories);
  const info = editId && allCategories.find((i) => i.id === editId);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [hasBrand, setHasBrand] = useState(false);
  const [form, setForm] = useState({
    parentId: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      isParent: isParent ? true : false,
      hasBrand: hasBrand ? true : false,
    };

    const process = editId ? customFetch.put : customFetch.post;
    const api = editId
      ? `/masters/categories/${editId}`
      : `/masters/categories`;
    const msg = editId ? `Details updated` : `Category added`;

    try {
      const response = await process(api, data);
      dispatch(updateCount());
      dispatch(unsetEditCategory());

      const acategories = await customFetch.get(`/masters/categories/all`);
      dispatch(setAllCategories(acategories.data.data.rows));

      setIsParent(false);
      setHasBrand(false);
      setForm({ ...form, parentId: editId && "", category: "" });

      toast.success(msg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const resetForm = () => {
    setIsParent(false);
    setHasBrand(false);
    setForm({ ...form, parentId: "", category: "" });
    dispatch(unsetEditCategory());
  };

  useEffect(() => {
    editId ? setIsParent(info?.parent_id ? false : true) : setIsParent(false);
    editId ? setHasBrand(info?.has_brand ? true : false) : setHasBrand(false);
    setForm({
      ...form,
      parentId: info?.parent_id || "",
      category: info?.category || "",
    });
  }, [info]);

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            {editId ? `Update details` : `Add new category`}
          </h2>
          <hr style={{ margin: "1rem 0" }} />
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-check required">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isParent"
                  checked={isParent}
                  onChange={() => setIsParent(!isParent)}
                />
                <span className="form-check-label">Is parent category?</span>
              </label>
            </div>

            {!isParent && (
              <>
                <div className="mb-3">
                  <label className="form-label required" htmlFor="parentId">
                    Parent category
                  </label>
                  <select
                    className="form-select"
                    name="parentId"
                    id="parentId"
                    value={form.parentId}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {allCategories?.map((i) => {
                      if (!i.parent_id) {
                        return (
                          <option key={nanoid()} value={i.id}>
                            {i.category.toUpperCase()}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </>
            )}

            <div className="mb-3">
              <label className="form-label required" htmlFor="category">
                Category name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hasBrand"
                  checked={hasBrand}
                  onChange={() => setHasBrand(!hasBrand)}
                />
                <span className="form-check-label">Has any brand/s?</span>
              </label>
            </div>
            <hr style={{ margin: "1rem 0" }} />
            <div className="form-footer text-end">
              <SubmitBtn
                className={`btn btn-success`}
                text={editId ? `Update` : `Add`}
                isLoading={isLoading}
              />
              <button
                type="button"
                className="btn btn-default ms-3"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAddEdit;
