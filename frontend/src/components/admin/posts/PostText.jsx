import React from "react";

const PostText = ({ name, type }) => {
  return (
    <>
      <input
        type={type}
        className="form-control"
        name={name}
        id={name}
        {...(type === "number" ? { min: 0 } : {})}
      />
    </>
  );
};

export default PostText;
