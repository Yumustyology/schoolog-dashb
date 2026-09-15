'use client';

import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { ExportIcon } from '@/components/atoms/icons/Icons';
import Search from '@/components/atoms/form/SearchInput';
import SelectComp from '@/components/atoms/form/Select';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import DepartmentsTableList from '@/components/molecules/dashboard/departments/DepartmentsTableList';
import type { Department } from '@/app/lib/types/department.types';
import departmentsActions from '@/app/lib/actions/departments.action';
import showToast from '@/app/lib/utils/toast';

const Page = () => {
  const breadcrumbs = [{ label: 'Departments', isActive: true }];
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    '/departments',
    () => departmentsActions.fetchDepartments()
  );

  const departments: Department[] = useMemo(() => {
    const departmentsResponse = data?.data;
    return (
      departmentsResponse?.map((department) => ({
        ...department,
        description: department.description ?? '',
        status: department.status ?? 'Active',
      })) || []
    );
  }, [data]);

  const filteredDepartments = useMemo(
    () =>
      departments.filter((department) =>
        [department.name, department.code, department.description]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [departments, search]
  );

  const isEditMode = Boolean(editingDepartmentId);

  const handleExportDepartments = async () => {
    setIsExporting(true);
    try {
      const blob = await departmentsActions.exportDepartments(
        search.trim() ? { search: search.trim() } : undefined
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'departments.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      showToast('Failed to export departments', 'department-export-error', {
        type: 'error',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setCode('');
    setDescription('');
    setStatus('Active');
    setEditingDepartmentId(null);
  };

  const handleCreateDepartment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !code.trim()) {
      showToast('Department name and code are required', 'department-validation', {
        type: 'error',
      });
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        description: description.trim(),
        status,
      };

      if (isEditMode && editingDepartmentId) {
        await departmentsActions.updateDepartment(editingDepartmentId, payload);
        showToast('Department updated successfully', 'department-updated', {
          type: 'success',
        });
      } else {
        await departmentsActions.createDepartment(payload);
        showToast('Department created successfully', 'department-created', {
          type: 'success',
        });
      }

      resetForm();
      await mutate();
    } catch (err) {
      showToast('Failed to save department', 'department-save-error', {
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    setDeleteDepartmentId(id);
  };

  const closeDeleteModal = () => {
    setDeleteDepartmentId(null);
  };

  const confirmDeleteDepartment = async () => {
    if (!deleteDepartmentId) return;

    setIsSaving(true);

    try {
      await departmentsActions.deleteDepartment(deleteDepartmentId);
      showToast('Department deleted successfully', 'department-deleted', {
        type: 'success',
      });
      await mutate();
    } catch (err) {
      showToast('Failed to delete department', 'department-delete-error', {
        type: 'error',
      });
    } finally {
      setIsSaving(false);
      closeDeleteModal();
    }
  };

  const handleEditDepartment = (id: string) => {
    const department = departments.find((item) => item._id === id);
    if (!department) return;

    setName(department.name || '');
    setCode(department.code || '');
    setDescription(department.description || '');
    setStatus(department.status === 'Inactive' ? 'Inactive' : 'Active');
    setEditingDepartmentId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />

        <div className="flex flex-wrap gap-4">
          <Button
            flat
            round
            onClick={handleExportDepartments}
            disabled={isExporting}
            loading={isExporting}
            className="h-[44px] py-3 px-6 flex gap-2 border border-primary"
          >
            <ExportIcon color="#0F62FE" />
            <span className={cn('text-base', Inter_500.className)}>
              {isExporting ? 'Exporting...' : 'Export Departments'}
            </span>
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 my-6 rounded-[28px] shadow-sm">
        <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
          <section className="rounded-[26px] border border-gray-200 bg-[#FBFBFB] p-6">
            <h2 className={cn('text-lg font-semibold text-gray-900', Inter_500.className)}>
              {isEditMode ? 'Edit department' : 'Create department'}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Add or update a department so subjects can be linked to departmental streams.
            </p>

            <form onSubmit={handleCreateDepartment} className="mt-6 space-y-4">
              <div>
                <label className={cn('mb-2 block text-sm font-medium text-gray-700', poppins_400.className)}>
                  Department name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={cn(
                    'w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary',
                    poppins_400.className
                  )}
                  placeholder="e.g. Science"
                />
              </div>

              <div>
                <label className={cn('mb-2 block text-sm font-medium text-gray-700', poppins_400.className)}>
                  Department code
                </label>
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={cn(
                    'w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary',
                    poppins_400.className
                  )}
                  placeholder="e.g. SCI"
                />
              </div>

              <div>
                <label className={cn('mb-2 block text-sm font-medium text-gray-700', poppins_400.className)}>
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className={cn(
                    'w-full min-h-[120px] rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary',
                    poppins_400.className
                  )}
                  placeholder="Describe this department"
                />
              </div>

              <SelectComp
                label="Status"
                htmlFor="department-status"
                value={status}
                onValueChange={(value) => setStatus(value as 'Active' | 'Inactive')}
                options={[
                  { id: 'Active', name: 'Active' },
                  { id: 'Inactive', name: 'Inactive' },
                ]}
                labelClassName="text-sm font-medium text-gray-700 mb-2"
                triggerClasses="rounded-3xl border-gray-200 h-[46px] bg-white"
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  flat
                  onClick={resetForm}
                  className="h-[44px] py-3 px-6 bg-transparent"
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  className="h-[44px] py-3 px-6 rounded-full"
                  disabled={isSaving}
                >
                  {isEditMode ? 'Update department' : 'Save department'}
                </Button>
              </div>
            </form>
          </section>

          <section className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Search
                placeholder="Search departments..."
                className="min-w-[280px] h-[44px] rounded-full bg-[#F7F7F7] border border-gray-200"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <DepartmentsTableList
              departments={filteredDepartments}
              onDelete={handleDeleteDepartment}
              onEdit={handleEditDepartment}
            />
          </section>
        </div>
      </div>

      <ConfirmModal
        open={Boolean(deleteDepartmentId)}
        close={closeDeleteModal}
        title="Delete department"
        body="Are you sure you want to delete this department? This action cannot be undone."
        onConfirm={confirmDeleteDepartment}
        confirmText="Delete"
        cancelText="Cancel"
        confirmClassName="bg-red-600 text-white"
        isLoading={isSaving}
      />
    </main>
  );
};

export default Page;
