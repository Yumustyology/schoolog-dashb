'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  type TableMeta,
} from '@tanstack/react-table';
import { Card, Typography } from '@material-tailwind/react';
import { cn } from '@/app/lib/utils';

/* ============================================================
   Types
============================================================ */

export interface DataTableProps<TData, TMeta = unknown> {
  data: TData[];
  columns: any[];
  meta?: TMeta;

  isLoading?: boolean;

  // Search
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (search: string) => void;
  clientSearch?: boolean;

  // Header
  leftHeader?: React.ReactNode;
  rightHeader?: React.ReactNode;
  fullHeader?: React.ReactNode;
  searchPlacement?: 'left' | 'right';

  // Footer
  footer?: React.ReactNode;
  footerClassName?: string;

  // Styling
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  thClassName?: string;
  tdClassName?: string;
  rowClassName?:
    | string
    | ((row: any, rowIndex: number, rows: any[]) => string);
  searchClassName?: string;
  loadingClassName?: string;
  emptyStateClassName?: string;

  // Custom states
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;

  // Behaviour
  enableSorting?: boolean;
  enableFiltering?: boolean;
  wrapCellsInTypography?: boolean;
  wrapHeadersInTypography?: boolean;
  useCardWrapper?: boolean;

  // Empty text
  emptyStateMessage?: string;
  notFoundMessage?: string;
}

/* ============================================================
   Extend TanStack Column Meta
============================================================ */

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    useTypography?: boolean;
    useHeaderTypography?: boolean;
  }
}

/* ============================================================
   Component
============================================================ */

function DataTable<TData, TMeta = unknown>({
  data,
  columns,
  meta,

  isLoading = false,

  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch,
  clientSearch = false,

  leftHeader,
  rightHeader,
  fullHeader,
  searchPlacement = 'left',

  className,
  containerClassName,
  headerClassName,
  tableClassName,
  theadClassName,
  tbodyClassName,
  thClassName,
  tdClassName,
  rowClassName,
  searchClassName,
  loadingClassName,
  emptyStateClassName,

  loadingComponent,
  emptyComponent,

  enableSorting = true,
  enableFiltering = true,
  wrapCellsInTypography = true,
  wrapHeadersInTypography = true,
  useCardWrapper = true,

  emptyStateMessage = 'No data available',
  notFoundMessage = 'No results found',

  footer,
  footerClassName,
}: DataTableProps<TData, TMeta>) {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    meta: meta as TableMeta<TData>,
    state: clientSearch ? { globalFilter } : undefined,
    onGlobalFilterChange: clientSearch ? setGlobalFilter : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
  });

  /* =======================
     Header
  ======================= */

  const renderSearchBar = () => (
    <div className={cn('relative w-full max-w-sm', searchClassName)}>
      <input
        type="text"
        className="pl-4 pr-4 py-2 border rounded-lg w-full h-12"
        placeholder={searchPlaceholder}
        value={clientSearch ? globalFilter : undefined}
        onChange={(e) => {
          const value = e.target.value;
          clientSearch ? setGlobalFilter(value) : onSearch?.(value);
        }}
      />
    </div>
  );

  const renderHeader = () => {
    if (!fullHeader && !leftHeader && !rightHeader && !showSearch) return null;

    const search = showSearch ? renderSearchBar() : null;
    const isLeft = searchPlacement === 'left';

    return (
      <div className={cn('p-6 pb-0', headerClassName)}>
        {fullHeader ? (
          <div className="mb-6">{fullHeader}</div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 flex-1">
              {isLeft && search}
              {leftHeader}
            </div>
            <div className="flex items-center gap-4 flex-1 justify-end">
              {!isLeft && search}
              {rightHeader}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* =======================
     Empty logic
  ======================= */

  const isSearchActive = Boolean(globalFilter.trim());
  const hasData = data.length > 0;
  const hasRows = table.getRowModel().rows.length > 0;

  const emptyMessage =
    !hasData && !isSearchActive
      ? emptyStateMessage
      : !hasRows && isSearchActive
      ? notFoundMessage
      : null;

  /* =======================
     Table
  ======================= */

  const tableContent = (
    <table className={cn('w-full min-w-max table-auto', tableClassName)}>
      <thead className={cn('bg-gray-100', theadClassName)}>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => {
              const content = header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );

              const useTypography =
                header.column.columnDef.meta?.useHeaderTypography ??
                wrapHeadersInTypography;

              return (
                <th key={header.id} className={cn('p-4', thClassName)}>
                  {useTypography ? (
                    <Typography variant="small" className="font-semibold">
                      {content}
                    </Typography>
                  ) : (
                    content
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody className={tbodyClassName}>
        {emptyMessage ? (
          emptyComponent || (
            <tr>
              <td colSpan={columns.length} className="h-60 text-center">
                <Typography className={emptyStateClassName}>
                  {emptyMessage}
                </Typography>
              </td>
            </tr>
          )
        ) : (
          table.getRowModel().rows.map((row, rowIndex, rows) => {
            const computedRowClassName =
              typeof rowClassName === 'function'
                ? rowClassName(row, rowIndex, rows)
                : rowClassName ?? '';

            return (
              <tr key={row.id} className={computedRowClassName}>
                {row.getVisibleCells().map((cell) => {
                  const content = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  );

                  const useTypography =
                    cell.column.columnDef.meta?.useTypography ??
                    wrapCellsInTypography;

                  return (
                    <td key={cell.id} className={cn('p-4 border-b', tdClassName)}>
                      {useTypography ? (
                        <Typography variant="small">{content}</Typography>
                      ) : (
                        content
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );

  /* =======================
     Render
  ======================= */

  return (
    <div className={cn('w-full', containerClassName)}>
      {renderHeader()}

      {isLoading ? (
        loadingComponent || (
          <div
            className={cn(
              'flex items-center justify-center h-64',
              loadingClassName
            )}
          >
            <Typography>Loading...</Typography>
          </div>
        )
      ) : useCardWrapper ? (
        <Card className={cn('mt-6 overflow-x-auto shadow-none', className)}>
          {tableContent}
        </Card>
      ) : (
        <div className={cn('mt-6 overflow-x-auto', className)}>
          {tableContent}
        </div>
      )}

      {!isLoading && footer && (
        <div className={cn('flex justify-center mt-4', footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
}

export default DataTable;
