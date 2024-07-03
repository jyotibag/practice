import React from "react";
import BtnSpinner from "./BtnSpinner";

const SubmitBtn = ({ text, isLoading, className }) => {
  return (
    <button
      type="submit"
      className={className || `btn btn-success`}
      disabled={isLoading}
    >
      {isLoading && <BtnSpinner />}
      {text || `Save and continue`}
    </button>
  );
};

export default SubmitBtn;
