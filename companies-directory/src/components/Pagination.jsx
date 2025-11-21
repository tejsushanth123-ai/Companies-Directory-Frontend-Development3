import React from "react";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <nav
      className="pagination-bar"
      aria-label="Companies list pagination"
    >
      <button
        type="button"
        onClick={handlePrev}
        disabled={page === 1}
        aria-label="Previous page"
      >
        Prev
      </button>

      <span aria-live="polite">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
