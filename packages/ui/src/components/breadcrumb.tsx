'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

export interface BreadcrumbItemProps {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemProps[];
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />,
  className,
  ...props
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)} {...props}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent || isLast;

          return (
            <li key={index} className="inline-flex items-center space-x-2">
              {index > 0 && <span aria-hidden="true">{separator}</span>}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center gap-1.5 font-semibold text-neutral-900"
                >
                  {item.icon && <span className="h-4 w-4 shrink-0 text-current">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 font-medium text-neutral-500 hover:text-primary-green transition-colors"
                >
                  {item.icon && <span className="h-4 w-4 shrink-0 text-current">{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-medium text-neutral-500">
                  {item.icon && <span className="h-4 w-4 shrink-0 text-current">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
Breadcrumb.displayName = 'Breadcrumb';
