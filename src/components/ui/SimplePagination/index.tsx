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
  totalPages = 1,
  onPageChange,
  className,
}: SimplePaginationProps) {
  const maxVisible = 5;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + maxVisible - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const baseButtonClass = "h-10 w-10 rounded-xs text-white flex items-center justify-center transition-colors";
  const defaultClass = "bg-pagination-default hover:bg-pagination-hover active:bg-pagination-active";
  const disabledClass = "bg-pagination-disabled";

  return (
    <nav className={cn("flex justify-center items-center gap-2", className)}>
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          baseButtonClass,
          currentPage === 1 ? disabledClass : defaultClass,
          'w-14'
        )}
      >
        <Image
          src="/assets/chevron-left.svg"
          alt="Previous"
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
          className={cn(
            baseButtonClass,
            page === currentPage ? "bg-pagination-active" : defaultClass
          )}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          baseButtonClass,
          currentPage === totalPages ? disabledClass : defaultClass,
          'w-14'
        )}
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
