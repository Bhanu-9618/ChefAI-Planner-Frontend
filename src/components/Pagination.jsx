import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        id="pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2.5 rounded-xl border transition-all duration-200 ${
          currentPage === 1
            ? "border-white/6 text-white/15 cursor-not-allowed"
            : "border-white/10 text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20"
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          id={`pagination-page-${page}`}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all duration-200 ${
            page === currentPage
              ? "bg-gradient-to-br from-orange-500 to-rose-500 border-transparent text-white shadow-lg shadow-orange-500/25"
              : "border-white/10 text-white/45 hover:text-white hover:bg-white/8 hover:border-white/20"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        id="pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2.5 rounded-xl border transition-all duration-200 ${
          currentPage === totalPages
            ? "border-white/6 text-white/15 cursor-not-allowed"
            : "border-white/10 text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20"
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
