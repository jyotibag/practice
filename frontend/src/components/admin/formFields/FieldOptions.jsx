import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFieldOption,
  deleteFieldOption,
  editFieldOption,
  setFieldOptions,
  unsetEditOption,
  updateFieldOption,
} from "../../../feature/formFields/formFieldSlice";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const FieldOptions = () => {
  const dispatch = useDispatch();
  const [ffOption, setFfOption] = useState("");
  const { editId, listFormFields, fieldOptions, editValue } = useSelector(
    (store) => store.formFields
  );
  const info = listFormFields?.find((i) => i.id === editId);

  const addFieldOptions = () => {
    if (!ffOption) {
      return toast.warning(`Enter an option`);
    }
    if (editValue.length === 0) {
      dispatch(addFieldOption(ffOption));
    } else {
      dispatch(updateFieldOption(ffOption));
    }
  };

  useEffect(() => {
    let options = [];
    info?.field_options &&
      info?.field_options?.map((i) => {
        options.push({ value: i.value });
      });

    if (fieldOptions.length === 0) {
      dispatch(setFieldOptions(options));
    }

    setFfOption(editValue ? editValue.value : "");
  }, [info, editValue]);

  return (
    <div className="card-body p-1">
      <div className="row row-cards">
        <div className="mb-3 col-md-6 mt-0 pt-0">
          <label className="form-label required" htmlFor="ffOption">
            Enter options :{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="ffOption"
            id="ffOption"
            value={ffOption}
            onChange={(e) => setFfOption(e.target.value)}
          />
        </div>
        <div className="col-auto mt-4">
          <button
            type="button"
            className="btn btn-success btn-md"
            style={{ marginTop: "4px" }}
            onClick={addFieldOptions}
          >
            {editValue.value ? `Update` : `Add`}
          </button>
          <button
            type="button"
            className="btn btn-default btn-md ms-3"
            style={{ marginTop: "4px" }}
            onClick={() => dispatch(unsetEditOption())}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-vcenter datatable table-hover table-bordered card-table fs-5">
          <thead>
            <tr>
              <th className="bg-dark text-white">SL. NO.</th>
              <th className="bg-dark text-white">Option</th>
              <th className="bg-dark text-white"></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(fieldOptions).map((i, index) => {
              return (
                <tr key={nanoid()}>
                  <td>{index + 1}.</td>
                  <td>{i?.value?.toUpperCase()}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-yellow btn-sm me-2"
                      onClick={() => dispatch(editFieldOption({ index }))}
                    >
                      <MdModeEdit size={14} />
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(deleteFieldOption({ index }))}
                    >
                      <FaRegTrashAlt size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldOptions;
