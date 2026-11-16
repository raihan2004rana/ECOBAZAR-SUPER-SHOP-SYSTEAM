'use client';

import * as React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  zebra?: boolean;
  dense?: boolean;
  bordered?: boolean;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No data available',
  emptyIcon,
  sortBy,
  sortDirection,
  onSort,
  zebra = false,
  dense = false,
  bordered = true,
  className,
}: DataTableProps<T>) {
  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <ArrowUpDown className="h-3.5 w-3.5 text-neutral-400 opacity-60 group-hover:opacity-100" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-primary-green" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-primary-green" />
    );
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-lg bg-white shadow-xs',
        bordered && 'border border-neutral-200',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-600 border-collapse">
          <thead className="bg-neutral-50/80 text-xs font-semibold uppercase tracking-wider text-neutral-500 border-b border-neutral-200">
            <tr>
              {columns.map((col) => {
                const alignClass = {
                  left: 'text-left',
                  center: 'text-center',
                  right: 'text-right',
                }[col.align || 'left'];

                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{ width: col.width }}
                    className={cn(
                      'px-4 select-none',
                      dense ? 'py-2.5' : 'py-3.5',
                      alignClass,
                      col.sortable && 'cursor-pointer hover:bg-neutral-100 transition-colors group',
                      col.className
                    )}
                    onClick={() => col.sortable && onSort?.(col.key)}
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5',
                        col.align === 'right' && 'justify-end',
                        col.align === 'center' && 'justify-center'
                      )}
                    >
                      <span>{col.header}</span>
                      {col.sortable && getSortIcon(col.key)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={`loading-row-${rIdx}`} className="animate-pulse">
                  {columns.map((col, cIdx) => (
                    <td key={`loading-cell-${cIdx}`} className={cn('px-4', dense ? 'py-2.5' : 'py-3.5')}>
                      <div className="h-4 bg-neutral-200 rounded-sm w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-neutral-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {emptyIcon && <div className="text-neutral-300">{emptyIcon}</div>}
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const rowKey = keyExtractor(item, index);
                return (
                  <tr
                    key={rowKey}
                    className={cn(
                      'transition-colors hover:bg-neutral-50/80',
                      zebra && index % 2 === 1 && 'bg-neutral-50/40'
                    )}
                  >
                    {columns.map((col) => {
                      const alignClass = {
                        left: 'text-left',
                        center: 'text-center',
                        right: 'text-right',
                      }[col.align || 'left'];

                      const cellContent = col.cell
                        ? col.cell(item, index)
                        : (item as Record<string, any>)[col.key];

                      return (
                        <td
                          key={`${rowKey}-${col.key}`}
                          className={cn(
                            'px-4 text-neutral-800',
                            dense ? 'py-2.5' : 'py-3.5',
                            alignClass,
                            col.className
                          )}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
