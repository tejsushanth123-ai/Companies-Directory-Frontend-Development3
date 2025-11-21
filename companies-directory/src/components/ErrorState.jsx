import React from "react";

function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="error-state"
    >
      <p>Failed to load companies: {message}</p>
      <button type="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorState;
