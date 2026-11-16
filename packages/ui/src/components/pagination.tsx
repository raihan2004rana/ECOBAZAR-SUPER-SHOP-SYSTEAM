'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../utils/cn';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  showItemCount?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  totalItems,
  itemsPerPage,
  showItemCount = false,
  className,
  ...props
}) => {
  if (totalPages <= 1 && !showItemCount) return null;

  const generatePageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3; // siblingCount on both sides + current + 2 edges
    const totalBlocks = totalNumbers + 2; // + 2 ellipses

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  };

  const pages = generatePageNumbers();

  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : undefined;
  const endItem =
    totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : undefined;

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn('flex flex-wrap items-center justify-between gap-4 py-3', className)}
      {...props}
    >
      {showItemCount && totalItems !== undefined && (
        <p className="text-sm text-neutral-500">
          Showing <span className="font-medium text-neutral-800">{startItem}</span> to{' '}
          <span className="font-medium text-neutral-800">{endItem}</span> of{' '}
          <span className="font-medium text-neutral-800">{totalItems}</span> results
        </p>
      )}

      <div className="inline-flex items-center gap-1">
        {showEdges && (
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage <= 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="inline-flex h-9 w-9 items-center justify-center text-sm font-medium text-neutral-400 select-none"
              >
                &hellip;
              </span>
            );
          }

          const pageNumber = Number(page);
          const isCurrent = pageNumber === currentPage;

          return (
            <button
              key={`page-${pageNumber}`}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors',
                isCurrent
                  ? 'bg-primary-green text-white font-semibold shadow-xs'
                  : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              )}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {showEdges && (
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage >= totalPages}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </nav>
  );
};
Pagination.displayName = 'Pagination';
