'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Modal from '@/components/molecules/Modal';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import FileUploader from '@/components/atoms/form/FileUploader';
import subjectsActions from '@/app/lib/actions/subjects.action';
import staffActions from '@/app/lib/actions/staff.action';
import showToast from '@/app/lib/utils/toast';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const fileToBase64 = (file: File): Promise<string | null> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

const emptyForm = {
  name: '',
  code: '',
  description: '',
  category: '',
  isPublic: false,
  creditHours: '',
  prerequisites: '',
  learningOutcomes: '',
  defaultTeacherId: '',
};

export default function CreateSubjectModal({ isOpen, onClose, onCreated }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: staffResp } = useSWR(isOpen ? 'staff-list' : null, () =>
    staffActions.fetchStaffList()
  );
  const teachers = (staffResp?.data || []).filter((s) => s.isTeachingStaff);

  const update = (field: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const resetAndClose = () => {
    setForm(emptyForm);
    setCoverImage(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      showToast('Subject name is required', 'subject-name-required', { type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const coverImagePayload = coverImage ? await fileToBase64(coverImage) : undefined;

      const payload: Record<string, unknown> = {
        name: form.name.trim(),
        code: form.code.trim() || undefined,
        description: form.description.trim() || undefined,
        category: form.category.trim() || undefined,
        isPublic: form.isPublic,
        creditHours: form.creditHours ? Number(form.creditHours) : undefined,
        prerequisites: form.prerequisites
          ? form.prerequisites.split(',').map((p) => p.trim()).filter(Boolean)
          : undefined,
        learningOutcomes: form.learningOutcomes
          ? form.learningOutcomes.split('\n').map((p) => p.trim()).filter(Boolean)
          : undefined,
        defaultTeacherId: form.defaultTeacherId || undefined,
        coverImage: coverImagePayload,
      };

      const response = await subjectsActions.createSubject(payload);
      if (response?.status === 'success') {
        showToast(response.message || 'Subject created', 'subject-create-success', {
          type: 'success',
        });
        onCreated?.();
        resetAndClose();
      } else {
        showToast('Could not create subject', 'subject-create-failed', { type: 'error' });
      }
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'An error occurred while creating the subject';
      showToast(message, 'subject-create-error', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Create Subject" className="tablet:w-[520px]">
      <div className="flex flex-col gap-4">
        <Input
          label="Subject name"
          placeholder="e.g. Mathematics"
          value={form.name}
          handleChange={update('name')}
          required
        />
        <Input
          label="Subject code"
          placeholder="e.g. MTH101"
          value={form.code}
          handleChange={update('code')}
        />
        <Input
          type="textarea"
          rows={3}
          label="Description"
          placeholder="Brief description of the subject"
          value={form.description}
          handleChange={update('description')}
        />
        <Input
          label="Category"
          placeholder="e.g. Science, Arts"
          value={form.category}
          handleChange={update('category')}
        />
        <div>
          <label className={cn('block text-left w-full text-base mb-3', poppins_400.className)}>
            Cover image
          </label>
          <FileUploader
            preview
            placeholder={<>Upload subject cover image</>}
            onFileSelected={setCoverImage}
            bordered
          />
        </div>
        <Input
          type="number"
          label="Credit hours"
          placeholder="e.g. 3"
          value={form.creditHours}
          handleChange={update('creditHours')}
        />
        <Input
          type="textarea"
          rows={2}
          label="Prerequisites (comma-separated)"
          placeholder="e.g. Basic Mathematics, Algebra I"
          value={form.prerequisites}
          handleChange={update('prerequisites')}
        />
        <Input
          type="textarea"
          rows={3}
          label="Learning outcomes (one per line)"
          placeholder="e.g. Understand basic algebra"
          value={form.learningOutcomes}
          handleChange={update('learningOutcomes')}
        />
        <div>
          <label className={cn('block text-left w-full text-base mb-3', poppins_400.className)}>
            Default teacher
          </label>
          <select
            className="input h-[46px] rounded-lg w-full border border-gray4 px-3"
            value={form.defaultTeacherId}
            onChange={(e) => setForm((prev) => ({ ...prev, defaultTeacherId: e.target.value }))}
          >
            <option value="">No default teacher</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="subject-public"
            checked={form.isPublic}
            onChange={(e) => setForm((prev) => ({ ...prev, isPublic: e.target.checked }))}
          />
          <label htmlFor="subject-public" className={cn('text-sm', poppins_400.className)}>
            Make this subject publicly visible
          </label>
        </div>

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
            {submitting ? 'Creating...' : 'Create Subject'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
