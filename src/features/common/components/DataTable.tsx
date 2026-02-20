'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  pageSize?: number;
  noResultsMessage?: string;
  paginationLabels?: {
    showing: string;
    of: string;
    previous: string;
    next: string;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  globalFilter = '',
  onGlobalFilterChange,
  columnFilters: externalColumnFilters,
  onColumnFiltersChange: externalOnColumnFiltersChange,
  pageSize = 5,
  noResultsMessage = 'No results found.',
  paginationLabels,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] =
    useState<ColumnFiltersState>([]);

  const columnFilters = externalColumnFilters ?? internalColumnFilters;
  const setColumnFilters =
    externalOnColumnFiltersChange ?? setInternalColumnFilters;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: (updater) => {
      const next =
        typeof updater === 'function' ? updater(columnFilters) : updater;
      setColumnFilters(next);
    },
    onGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const { pageIndex } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex min-h-112.5 flex-col justify-between">
      <div>
        <Table className="min-w-250 border-collapse text-left">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-800 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  const isSticky =
                    (header.column.columnDef.meta as { sticky?: boolean })
                      ?.sticky === true;
                  return (
                    <TableHead
                      key={header.id}
                      className={`pb-4 text-xs font-medium text-gray-400${
                        isSticky
                          ? ' sticky right-0 z-10 bg-dark-surface'
                          : ''
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group border-b border-gray-800/50 last:border-0 hover:bg-dark/30"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isSticky =
                      (cell.column.columnDef.meta as { sticky?: boolean })
                        ?.sticky === true;
                    return (
                      <TableCell
                        key={cell.id}
                        className={`py-4 text-sm${
                          isSticky
                            ? ' sticky right-0 z-10 bg-dark-surface'
                            : ''
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center text-gray-500"
                >
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalRows > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-400">
            {paginationLabels?.showing ?? 'Showing'}{' '}
            <span className="font-bold text-white">{from}</span> -{' '}
            <span className="font-bold text-white">{to}</span>{' '}
            {paginationLabels?.of ?? 'of'}{' '}
            <span className="font-bold text-white">{totalRows}</span>
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-lg border border-gray-700 bg-transparent px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
            >
              {paginationLabels?.previous ?? 'Previous'}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-lg border border-gray-700 bg-transparent px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
            >
              {paginationLabels?.next ?? 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
