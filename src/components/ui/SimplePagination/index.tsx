import Image from 'next/image'

interface SimplePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function SimplePagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = ''
}: SimplePaginationProps) {
  
  // Função para calcular páginas visíveis (sliding window)
  const getVisiblePages = () => {
    const maxVisible = 5
    
    // Se total de páginas <= 5, mostra todas
    if (totalPages <= maxVisible) {
      const pages = []
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
    
    let startPage: number
    
    // Comportamento sliding: 1,2,3,4,5 -> 5,6,7,8,9 -> 9,10,11,12,13
    if (currentPage < maxVisible) {
      startPage = 1
    } else {
      startPage = currentPage
    }
    
    const endPage = Math.min(startPage + maxVisible - 1, totalPages)
    
    // Ajustar se estamos perto do final
    if (endPage - startPage + 1 < maxVisible && totalPages >= maxVisible) {
      startPage = Math.max(1, totalPages - maxVisible + 1)
    }
    
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    
    return pages
  }

  const visiblePages = getVisiblePages()
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  // Event handlers diretos
  const handlePrevious = () => {
    const prevPage = Math.max(1, currentPage - 1)
    onPageChange(prevPage)
  }

  const handleNext = () => {
    const nextPage = Math.min(totalPages, currentPage + 1)
    onPageChange(nextPage)
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  return (
    <nav 
      className={`flex justify-center items-center gap-2 ${className}`}
      role="navigation"
      aria-label="pagination"
    >
      {/* Previous Button */}
      <button 
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className="h-10 w-12 flex items-center justify-center bg-[var(--color-primary-default)] text-white rounded hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] disabled:bg-[var(--color-secondary-disabled)] disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Previous page"
      >
        <Image 
          src="/assets/chevron-left.svg" 
          alt="Previous" 
          width={18} 
          height={18} 
          style={{ filter: 'invert(1)' }}
        />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`h-10 w-10 flex items-center justify-center rounded font-semibold transition-colors duration-200 ${
            page === currentPage
              ? 'bg-[var(--color-secondary-active)] text-white cursor-default'
              : 'bg-[var(--color-primary-default)] text-white hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)]'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button 
        onClick={handleNext}
        disabled={!canGoNext}
        className="h-10 w-12 flex items-center justify-center bg-[var(--color-primary-default)] text-white rounded hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] disabled:bg-[var(--color-secondary-disabled)] disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Next page"
      >
        <Image 
          src="/assets/chevron-right.svg" 
          alt="Next" 
          width={18} 
          height={18} 
          style={{ filter: 'invert(1)' }}
        />
      </button>
    </nav>
  )
}