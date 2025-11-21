import React from "react";

function SortControls({ sortOrder, onSortChange }) {
  const toggleSort = () => {
    onSortChange(sortOrder === "asc" ? "desc" : "asc");
  };

  const label = sortOrder === "asc" ? "Name A → Z" : "Name Z → A";

  return (
    <div className="sort-controls">
      <button
        type="button"
        onClick={toggleSort}
        aria-label={`Sort companies by name ${sortOrder === "asc" ? "descending" : "ascending"}`}
      >
        {label}
      </button>
    </div>
  );
}

export default SortControls;
