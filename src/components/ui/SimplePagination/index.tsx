import { cn } from "@/lib/utils";
import Image from "next/image";

interface SimplePaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
}: SimplePaginationProps) {
  const maxVisible = 5;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages || 0, start + maxVisible - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const buttonClass =
    "h-10 px-3 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  return (
    <nav className="flex justify-center items-center gap-2">
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={buttonClass}
      >
        <Image
          src="/assets/chevron-left.svg"
          alt="Next"
          width={18}
          height={18}
          style={{ filter: "invert(1)" }}
        />
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(buttonClass, page === currentPage && "bg-purple-800", 'w-10', 'h-10')}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages || 0, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={buttonClass}
      >
        <Image
          src="/assets/chevron-right.svg"
          alt="Next"
          width={18}
          height={18}
          style={{ filter: "invert(1)" }}
        />
      </button>
    </nav>
  );
}
