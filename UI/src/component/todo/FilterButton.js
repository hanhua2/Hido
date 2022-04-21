import React from "react";

function FilterButton(props) {
  return (
    <button
      className="btn toggle-btn"
      type="button"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
}

export default FilterButton;
