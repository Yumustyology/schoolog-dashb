'use client';


import { formatDate } from '@/app/lib/utils/dateUtils';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/app/lib/utils';
import {
  Inter_400,
  Inter_500,
  poppins_400,
} from '@/app/lib/config/font.config';
import DataTable from '@/components/molecules/DataTable';
import Button from '@/components/atoms/form/Button';
import { EditIcon, DeleteIcon } from '@/components/atoms/icons/Icons';

import useSWR from 'swr';
import {
  getAcademicYears,
  deleteAcademicYearById,
} from '@/app/lib/actions/academicYear.actions';
import { getAcademicYearStatus } from '@/components/atoms/dashboard/academic-years/AcademicYearDrawer';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import EyeClose from '@/components/atoms/icons/EyeClose';
import TermSessionIcon from '@/components/atoms/icons/SideBar/TermSessionIcon';
import AcademicYearDrawer from '@/components/atoms/dashboard/academic-years/AcademicYearDrawer';
import showToast from '@/app/lib/utils/toast';

export interface AcademicYearRow {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

interface Props {
  page: number;
  setPage: (v: number) => void;
  pageSize: number;
  setPageSize: (v: number) => void;
  hasEverLoadedData: boolean;
  setHasEverLoadedData: (v: boolean) => void;
}

const columnHelper = createColumnHelper<AcademicYearRow>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Academic Session',
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="flex gap-3 items-center">
          <div className="h-9 w-9 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center">
            <TermSessionIcon color="#FFFFFF" />
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-gray">ID: {row.id}</p>
          </div>
        </div>
      );
    },
    meta: { useTypography: false },
  }),

  columnHelper.display({
    id: 'duration',
    header: 'Duration',
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="text-sm flex-shrink-0">
          <span>{formatDate(row.startDate)}</span>
          <span className="text-gray">
            {' '}
            <b>to</b> {formatDate(row.endDate)}
          </span>
        </div>
      );
    },
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      const map = {
        active: 'bg-green-100 text-green-700',
        completed: 'bg-gray-100 text-gray-700',
        upcoming: 'bg-blue-100 text-blue-700',
      };
      return (
        <div
          className={cn(
            'rounded-full py-2 px-2 text-sm text-center capitalize',
            map[status]
          )}
        >
          {status}
        </div>
      );
    },
    meta: { useTypography: false },
  }),

  columnHelper.display({
    id: 'actions',
    header: '',
    cell: (info) => {
      const row = info.row.original;
      // Use meta to pass delete handler
      return (
        <div className="flex justify-end gap-2">
          <Button
            to={`/school/academic-year/edit/${row.id}`}
            flat
            className="p-2"
          >
            <EditIcon />
          </Button>
          <Button
            flat
            className="p-2"
            onClick={() => info.table.options.meta?.onDelete?.(row.id, row.name)}
          >
            <DeleteIcon />
          </Button>
          <Button
            onClick={() => info.table.options.meta?.openDrawer?.(row.id)}
            className={cn(
              'bg-gray7 text-gray6 flex gap-3 text-sm rounded-full',
              poppins_400.className
            )}
          >
            <EyeClose />
            <span>View</span>
          </Button>
        </div>
      );
    },
  }),
];


const AcademicYearsTableList = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  hasEverLoadedData,
  setHasEverLoadedData,
}: Props) => {
  const { data, isLoading, mutate } = useSWR(
    '/get-academic-years',
    getAcademicYears
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAcademicYearId, setSelectedAcademicYearId] = useState<
    string | null
  >(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDrawer = useCallback((id: string) => {
    setSelectedAcademicYearId(id);
    setDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelectedAcademicYearId(null);
  }, []);

  const onDelete = useCallback((id: string, name: string) => {
    setDeleteTarget({ id, name });
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAcademicYearById(deleteTarget.id);
      showToast(
        `Academic year "${deleteTarget.name}" deleted successfully.`,
        'deleting-academic-year',
        {
          type: 'success',
        }
      );
      setDeleteModalOpen(false);
      setDeleteTarget(null);
      mutate();
    } catch (err) {
      showToast(
        `Failed to delete "${deleteTarget.name}". Please try again.`,
        'failed-academic-year',
        {
          type: 'error',
        }
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeleteTarget(null);
    setIsDeleting(false);
  };

  const tableData = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];

    return data.data.map((item) => {
      let status = getAcademicYearStatus(
        item.startDate,
        item.endDate
      ).toLowerCase() as 'active' | 'completed' | 'upcoming';
      if (item.isActive) {
        status = 'active';
      }
      return {
        id: item._id,
        name: item.name,
        startDate: item.startDate,
        endDate: item.endDate,
        status,
      };
    });
  }, [data]);

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      setHasEverLoadedData(true);
    }
  }, [data, setHasEverLoadedData]);

  return (
    <div className="my-8">
      <DataTable
        data={tableData}
        columns={columns}
        isLoading={isLoading}
        theadClassName={cn('bg-[#FBFBFB]', Inter_500.className)}
        thClassName="p-4"
        tdClassName="p-4"
        rowClassName={(row, rowIndex, rows) =>
          cn(
            rowIndex < rows.length - 1
              ? 'border-b border-gray4'
              : 'border-b-none',
            Inter_400.className
          )
        }
        tableClassName="text-sm text-black-500 font-nunito w-full min-w-max font-medium table-auto text-left"
        useCardWrapper={false}
        wrapCellsInTypography={true}
        wrapHeadersInTypography={true}
        enableSorting={false}
        enableFiltering={false}
        meta={{ openDrawer, onDelete }}
      />
      <ConfirmModal
        open={deleteModalOpen}
        close={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Academic Year"
        body={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ''
        }
        confirmText="Delete"
        confirmClassName="bg-red-400"
        isLoading={isDeleting}
      />
      <AcademicYearDrawer
        open={drawerOpen}
        closeDrawer={closeDrawer}
        academicYearId={selectedAcademicYearId || ''}
      />
    </div>
  );
};

export default AcademicYearsTableList;
