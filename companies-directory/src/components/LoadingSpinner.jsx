import React from "react";

function LoadingSpinner() {
  return (
    <div
      className="loading"
      role="status"
      aria-live="polite"
      aria-label="Loading companies"
    >
      <div className="spinner" />
      <span>Loading companies...</span>
    </div>
  );
}

export default LoadingSpinner;
