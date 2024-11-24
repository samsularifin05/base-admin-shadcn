import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components';
import { useState } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  total: number; // Total baris dari backend
  page: number;
  limit: number;
  onPageChange: (page: number, limit: number) => void;
}

export function DataTablePagination<TData>({
  table,
  total,
  page,
  limit,
  onPageChange
}: DataTablePaginationProps<TData>) {
  const totalPages = Math.ceil(total / limit);

  const [newPage, setNewPage] = useState(page);

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    // Set new page size and reset to first page
    table.setPageSize(newPageSize);
    onPageChange(1, newPageSize); // Notify parent about page size change
  };

  const handlePageChange = (newPage: number) => {
    table.setPageIndex(newPage);
    onPageChange(newPage, limit); // Notify parent about page change
    setNewPage(newPage);
  };
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length ? (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </>
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${limit}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {Number(newPage)} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={newPage === 0}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => handlePageChange(newPage - 1)}
            disabled={newPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => handlePageChange(newPage + 1)}
            disabled={newPage >= totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => handlePageChange(totalPages)}
            disabled={newPage >= totalPages - 1}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
