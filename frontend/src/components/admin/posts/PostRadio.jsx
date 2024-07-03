import { nanoid } from "nanoid";
import React from "react";

const PostRadio = ({ name, options }) => {
  return (
    <div>
      {options.map((i) => {
        const { option_id, option_value } = i;

        return (
          <label key={nanoid()} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={name}
              // checked=""
            />
            <span className="form-check-label">{option_value}</span>
          </label>
        );
      })}
    </div>
  );
};

export default PostRadio;
