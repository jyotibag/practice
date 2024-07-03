import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../SubmitBtn";
import { nanoid } from "nanoid";
import { getBrands, unsetCatBrands } from "../../../feature/masters/brandSlice";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { unsetEditBrandModel } from "../../../feature/masters/brandModelSlice";
import { toast } from "react-toastify";
import { updateCount } from "../../../feature/commonSlice";

const BrandModelAddEdit = () => {
  const dispatch = useDispatch();
  const { editId, listBrandModels } = useSelector((store) => store.models);
  const { allCategories } = useSelector((store) => store.categories);
  const { catBrands } = useSelector((store) => store.brands);
  const info = listBrandModels?.find((i) => i.id === editId);

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ catId: "", brandId: "", modelName: "" });

  const handleCatChange = (catid) => {
    setForm({ ...form, catId: catid });
    dispatch(getBrands(Number(catid)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const process = editId ? customFetch.put : customFetch.post;
    const api = editId ? `/masters/models/${editId}` : `/masters/models`;
    const msg = editId ? `Details updated` : `Model added`;
    try {
      const response = await process(api, data);

      dispatch(updateCount());
      dispatch(unsetEditBrandModel());
      dispatch(unsetCatBrands());

      setForm({
        ...form,
        catId: editId ? "" : data.catId,
        brandId: editId ? "" : data.brandId,
        modelName: "",
      });
      toast.success(msg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const resetForm = () => {
    setForm({ ...form, catId: "", brandId: "", modelName: "" });
    dispatch(unsetEditBrandModel());
    dispatch(unsetCatBrands());
  };

  useEffect(() => {
    setForm({
      ...form,
      catId: info ? info?.cat_id : "",
      brandId: info ? info?.brand_id : "",
      modelName: info ? info?.model_name : "",
    });

    if (editId) {
      dispatch(getBrands(Number(info?.cat_id)));
    }
  }, [info]);

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            {editId ? `Update details` : `Add new model`}
          </h2>
          {editId && <p className="page-pretitle">Do NOT change page</p>}
          <hr style={{ margin: "1rem 0" }} />
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label required" htmlFor="catId">
                Select category
              </label>
              <select
                className="form-select"
                name="catId"
                id="catId"
                value={form.catId}
                onChange={(e) => handleCatChange(e.target.value)}
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
              <label className="form-label required" htmlFor="brandId">
                Select brand
              </label>
              <select
                className="form-select"
                name="brandId"
                id="brandId"
                value={form.brandId}
                onChange={(e) => setForm({ ...form, brandId: e.target.value })}
              >
                <option value="">Select</option>
                {catBrands?.map((i) => {
                  return (
                    <option key={nanoid()} value={i?.id}>
                      {i?.brand?.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label required" htmlFor="modelName">
                Model name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="modelName"
                id="modelName"
                value={form.modelName}
                onChange={(e) =>
                  setForm({ ...form, modelName: e.target.value })
                }
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

export default BrandModelAddEdit;
