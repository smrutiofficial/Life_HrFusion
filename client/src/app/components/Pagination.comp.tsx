import React from "react";

interface PaginationProps {
  totalResults: number;
  resultsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalResults,
  resultsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
//   const maxPageNumbers = 5;

  const generatePages = () => {
    const pages = [];
    const leftDots = currentPage > 3;
    const rightDots = currentPage < totalPages - 2;

    if (leftDots) pages.push(1);
    if (leftDots && currentPage > 3) pages.push("...");

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (rightDots && currentPage < totalPages - 2) pages.push("...");
    if (rightDots) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-3 text-sm text-gray-300">
      <p>
        Showing {Math.min((currentPage - 1) * resultsPerPage + 1, totalResults)} to{" "}
        {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults} results
      </p>

      <div className="flex items-center gap-2 bg-black/50 p-2 rounded-md">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 ${currentPage === 1 ? "text-gray-500" : "text-white"}`}
        >
          {"<"}
        </button>

        {generatePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage ? "bg-gray-700 text-white" : "text-gray-400"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 ${currentPage === totalPages ? "text-gray-500" : "text-white"}`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
