'use client';

import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import type { Department } from '@/app/lib/types/department.types';

interface DepartmentsTableListProps {
  departments: Department[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const DepartmentsTableList = ({ departments, onDelete, onEdit }: DepartmentsTableListProps) => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#FBFBFB]">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Department name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Code
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {departments.length ? (
            departments.map((department) => (
              <tr key={department._id}>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                  {department.name}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                  {department.code}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {department.description}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                  <span className={cn(
                    'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
                    department.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700'
                  )}>
                    {department.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium space-x-2">
                  <button
                    type="button"
                    onClick={() => onEdit(department._id)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(department._id)}
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                No departments available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentsTableList;
