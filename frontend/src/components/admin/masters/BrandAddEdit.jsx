import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../SubmitBtn";
import { nanoid } from "nanoid";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { toast } from "react-toastify";
import {
  setAllBrands,
  unsetEditBrand,
} from "../../../feature/masters/brandSlice";
import { updateCount } from "../../../feature/commonSlice";

const BrandAddEdit = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((store) => store.categories);
  const { editId, allBrands } = useSelector((store) => store.brands);
  const info = allBrands?.find((i) => i.id === editId);

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    parentId: "",
    brand: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const process = editId ? customFetch.put : customFetch.post;
    const api = editId ? `/masters/brands/${editId}` : `/masters/brands`;
    const msg = editId ? `Details updated` : `Brand added`;

    try {
      const response = await process(api, data);
      dispatch(updateCount());
      dispatch(unsetEditBrand());

      const abrands = await customFetch.get(`/masters/brands/all`);
      dispatch(setAllBrands(abrands.data.data.rows));

      setForm({ ...form, parentId: editId && "", brand: "" });
      toast.success(msg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const resetForm = () => {
    setForm({ ...form, parentId: "", brand: "" });
    dispatch(unsetEditBrand());
  };

  useEffect(() => {
    setForm({
      ...form,
      parentId: info?.cat_id || "",
      brand: info?.brand || "",
    });
  }, [info]);

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            {editId ? `Update details` : `Add new brand`}
          </h2>
          <hr style={{ margin: "1rem 0" }} />
          <form autoComplete="off" onSubmit={handleSubmit}>
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
                  if (i.has_brand) {
                    return (
                      <option key={nanoid()} value={i?.id}>
                        {i?.category?.toUpperCase()}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label required" htmlFor="brand">
                Brand name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="brand"
                id="brand"
                value={form.brand}
                onChange={handleChange}
              />
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

export default BrandAddEdit;
