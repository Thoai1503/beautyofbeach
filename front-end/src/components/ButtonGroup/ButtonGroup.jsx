import React from "react";

const ButtonGroup = ({ name, setContinentBtn }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={() => setContinentBtn(`${name}`)}
    >
      {name}
    </button>
  );
};

export default ButtonGroup;
