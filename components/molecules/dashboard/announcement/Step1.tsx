'use client';

import Input from '@/components/atoms/form/Input';
import { poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import AnnoucementUploadBox from '@/components/atoms/dashboard/announcement/AnnoucementUploadBox';
import { useEntity } from 'simpler-state';
import {
  announcementFormState,
  updateAnnouncementForm,
} from '@/app/lib/entities/annoucement.entity';

function Step1() {
  const form = useEntity(announcementFormState);

  return (
    <div>
      <div className="mb-12 mt-6">
        <p className={cn('text-primary text-xs', poppins_600.className)}>
          Create Annoucement
        </p>
        <h2
          className={cn(
            'text-xl text-gray1 mb-1 text-cente mt-3',
            poppins_500.className
          )}
        >
          Input announcement details to proceed
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        <Input
          id="announcement-title"
          label="Annoucement title"
          type="text"
          labelClassName="label"
          className="input h-14 rounded-lg"
          name="title"
          placeholder="Input announcement title"
          value={form.title}
          handleChange={(e) => updateAnnouncementForm({ title: e.target.value })}
        />

        <Input
          id="announcement-description"
          type="textarea"
          label="Description"
          labelClassName="label"
          name="message"
          placeholder="Input description"
          value={form.message}
          handleChange={(e) =>
            updateAnnouncementForm({ message: e.target.value })
          }
        />

        <div className="flex flex-col gap-3">
          <AnnoucementUploadBox />
        </div>
      </div>
    </div>
  );
}

export default Step1;
