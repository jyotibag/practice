import React from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { useDispatch } from "react-redux";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { updateCount } from "../../../feature/commonSlice";
import { splitErrors } from "../../../utils/showErrors";

const ActivateUser = ({ id }) => {
  const dispatch = useDispatch();

  const activateUser = async () => {
    try {
      await customFetch.post(`/users/activate/${id}`);
      toast.success(`User activated`);
      dispatch(updateCount());
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <button
      type="button"
      className="btn btn-success btn-sm"
      onClick={activateUser}
    >
      <MdOutlineThumbUp size={14} />
    </button>
  );
};

export default ActivateUser;
