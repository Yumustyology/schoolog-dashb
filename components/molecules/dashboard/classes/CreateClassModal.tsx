'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Modal from '@/components/molecules/Modal';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import departmentsActions from '@/app/lib/actions/departments.action';
import showToast from '@/app/lib/utils/toast';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import type { Department } from '@/app/lib/types/department.types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const emptyForm = {
  name: '',
  code: '',
  levelCategory: '' as '' | 'junior' | 'senior',
  hasDepartments: false,
  academicYear: '',
  capacity: '',
  description: '',
};

export default function CreateClassModal({ isOpen, onClose, onCreated }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const { data: departmentResponse } = useSWR(
    isOpen && form.hasDepartments ? '/departments' : null,
    () => departmentsActions.fetchDepartments()
  );
  const departments = (departmentResponse?.data as Department[] | undefined) || [];

  const update = (field: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleDepartment = (id: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const resetAndClose = () => {
    setForm(emptyForm);
    setSelectedDepartments([]);
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      showToast('Class name is required', 'class-name-required', { type: 'error' });
      return;
    }
    if (form.hasDepartments && selectedDepartments.length === 0) {
      showToast('Select at least one department', 'class-department-required', {
        type: 'error',
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await classGradeActions.createClassGrade({
        name: form.name.trim(),
        code: form.code.trim() || undefined,
        levelCategory: form.levelCategory || undefined,
        hasDepartments: form.hasDepartments,
        departmentIds: form.hasDepartments ? selectedDepartments : undefined,
        academicYear: form.academicYear.trim() || undefined,
        capacity: form.capacity ? Number(form.capacity) : undefined,
        description: form.description.trim() || undefined,
      });

      if (response?.status === 'success') {
        showToast(response.message || 'Class created', 'class-create-success', {
          type: 'success',
        });
        onCreated?.();
        resetAndClose();
      } else {
        showToast('Could not create class', 'class-create-failed', { type: 'error' });
      }
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'An error occurred while creating the class';
      showToast(message, 'class-create-error', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Create Class" className="tablet:w-[480px]">
      <div className="flex flex-col gap-4">
        <Input
          label="Class name"
          placeholder="e.g. JSS 1"
          value={form.name}
          handleChange={update('name')}
          required
        />
        <Input
          label="Class code"
          placeholder="e.g. JSS1"
          value={form.code}
          handleChange={update('code')}
        />
        <div>
          <label className={cn('block text-left w-full text-base mb-3', poppins_400.className)}>
            Level
          </label>
          <div className="flex gap-4">
            {(['junior', 'senior'] as const).map((lvl) => (
              <label key={lvl} className="flex items-center gap-2 capitalize">
                <input
                  type="radio"
                  name="levelCategory"
                  checked={form.levelCategory === lvl}
                  onChange={() => setForm((prev) => ({ ...prev, levelCategory: lvl }))}
                />
                {lvl}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="has-departments"
            checked={form.hasDepartments}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, hasDepartments: e.target.checked }))
            }
          />
          <label htmlFor="has-departments" className={cn('text-sm', poppins_400.className)}>
            This class has departments
          </label>
        </div>

        {form.hasDepartments && (
          <div className="pl-2 flex flex-col gap-2">
            {departments.length === 0 && (
              <p className={cn('text-xs text-gray6', poppins_400.className)}>
                No departments found — create one first from the Departments page.
              </p>
            )}
            {departments.map((d) => (
              <label key={d._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(d._id)}
                  onChange={() => toggleDepartment(d._id)}
                />
                {d.name}
              </label>
            ))}
          </div>
        )}

        <Input
          label="Academic year"
          placeholder="e.g. 2025/2026"
          value={form.academicYear}
          handleChange={update('academicYear')}
        />
        <Input
          type="number"
          label="Capacity"
          placeholder="e.g. 40"
          value={form.capacity}
          handleChange={update('capacity')}
        />
        <Input
          type="textarea"
          rows={3}
          label="Description"
          placeholder="Optional description"
          value={form.description}
          handleChange={update('description')}
        />

        <div className="flex justify-end gap-3 mt-2">
          <Button
            outlined
            round
            className="px-6 h-[44px] bg-white text-primary"
            onClick={resetAndClose}
          >
            Cancel
          </Button>
          <Button
            round
            className="px-6 h-[44px]"
            onClick={handleSubmit}
            disabled={submitting}
            loading={submitting}
          >
            {submitting ? 'Creating...' : 'Create Class'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
