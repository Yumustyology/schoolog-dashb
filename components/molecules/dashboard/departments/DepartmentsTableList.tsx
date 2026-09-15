'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import type { Department } from '@/app/lib/types/department.types';
import DataTable from '@/components/molecules/DataTable';

interface DepartmentsTableListProps {
  departments: Department[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const columnHelper = createColumnHelper<Department>();

const DepartmentsTableList = ({ departments, onDelete, onEdit }: DepartmentsTableListProps) => {
  const columns = [
    columnHelper.accessor('name', {
      header: 'Department name',
      cell: (info) => (
        <span className="whitespace-nowrap text-sm font-medium text-gray-900">
          {info.getValue()}
        </span>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('code', {
      header: 'Code',
      cell: (info) => (
        <span className="whitespace-nowrap text-sm text-gray-600">{info.getValue()}</span>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => <span className="text-sm text-gray-600">{info.getValue()}</span>,
      meta: { useTypography: false },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
            info.getValue() === 'Active'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          {info.getValue()}
        </span>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span className="block text-right">Actions</span>,
      cell: (info) => {
        const department = info.row.original;
        const isSystemDefault = Boolean(department.isSystemDefault);
        return (
          <div className="whitespace-nowrap text-right space-x-2">
            <button
              type="button"
              onClick={() => onEdit(department._id)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
            >
              Edit
            </button>
            <button
              type="button"
              disabled={isSystemDefault}
              onClick={() => onDelete(department._id)}
              title={
                isSystemDefault
                  ? 'Default departments cannot be deleted — set status to Inactive to hide it instead'
                  : undefined
              }
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-semibold transition',
                isSystemDefault
                  ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
                  : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
              )}
            >
              Delete
            </button>
          </div>
        );
      },
      meta: { useTypography: false, useHeaderTypography: false },
    }),
  ];

  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
      <DataTable
        data={departments}
        columns={columns}
        isLoading={false}
        theadClassName="bg-[#FBFBFB]"
        thClassName={cn('px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500', Inter_500.className)}
        tdClassName="px-4 py-4"
        rowClassName={cn('border-b border-gray-200 last:border-b-0', Inter_400.className)}
        tableClassName="min-w-full divide-y divide-gray-200"
        useCardWrapper={false}
        wrapCellsInTypography={false}
        wrapHeadersInTypography={false}
        enableSorting={false}
        enableFiltering={false}
        emptyStateMessage="No departments available."
      />
    </div>
  );
};

export default DepartmentsTableList;
