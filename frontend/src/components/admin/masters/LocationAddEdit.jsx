import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../SubmitBtn";
import { unsetEditLocation } from "../../../feature/masters/locationSlice";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { updateCount } from "../../../feature/commonSlice";
import { toast } from "react-toastify";

const LocationAddEdit = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ stateName: "", city: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { editId, allStates, listLocations } = useSelector(
    (store) => store.locations
  );
  const info = listLocations?.find((i) => i.id === editId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const process = editId ? customFetch.put : customFetch.post;
    const api = editId ? `/masters/locations/${editId}` : `/masters/locations`;
    const msg = editId ? `Details updated` : `Location added`;
    try {
      const response = await process(api, data);

      dispatch(updateCount());
      if (editId) {
        dispatch(unsetEditLocation());
      }

      setForm({ ...form, stateName: "", city: "" });
      toast.success(msg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const resetForm = () => {
    setForm({ ...form, stateName: "", city: "" });
    dispatch(unsetEditLocation());
  };

  useEffect(() => {
    setForm({
      ...form,
      stateName: editId ? info?.state : "",
      city: editId ? info?.city : "",
    });
  }, [info]);

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            {editId ? `Update details` : `Add new location`}
          </h2>
          <hr style={{ margin: "1rem 0" }} />
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label required" htmlFor="stateName">
                State
              </label>
              <select
                className="form-select"
                name="stateName"
                id="stateName"
                value={form.stateName}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {allStates?.map((i) => {
                  return (
                    <option key={nanoid()} value={i?.id}>
                      {i?.state?.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label required" htmlFor="city">
                City name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="city"
                id="city"
                value={form.city}
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

export default LocationAddEdit;
