import Input from '@/components/atoms/form/Input';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import { useEntity } from 'simpler-state';
import ImageUploader from '@/components/atoms/form/ImageUploader';
import FormSectionHeader from './FormSectionHeader';
import { SelectClassGrade } from '@/components/atoms/dashboard/materials/SelectClassGrade';

function Step1() {
  const createSubject = useEntity(createSubjectEntity);

  const handleImageSelected = (file: File | null) => {
    createSubjectEntity.set((prev) => ({ ...prev, coverImage: file }));
  };

  const updateName = (v: string) => {
    createSubjectEntity.set((prev) => ({ ...prev, name: v }));
  };

  const updateClassGrade = (v: string) => {
    createSubjectEntity.set((prev) => ({ ...prev, classGrade: v }));
  };

  return (
    <div>
      <FormSectionHeader
        title="Create Subject"
        description={'Input the details of the subject'}
      />
      <Input
        id="subject"
        label="Subject name"
        type="text"
        labelClassName="label"
        className="input h-14 rounded-lg"
        name="text"
        placeholder="Subject name"
        value={createSubject.name}
        handleChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateName(e.target.value)}
      />

      <div className="mt-5">
      <label
        className={cn(
          'block text-left w-full font-nunito text-base mb-3',
          poppins_400.className
        )}
      >
        Select class/level
      </label>
        <SelectClassGrade
          className={cn(
            'h-14 shadow-none rounded-lg text-gray1-- text-base',
            poppins_400.className
          )}
          value={createSubject.classGrade ?? ''}
          onValueChange={updateClassGrade}
        />
      </div>

      <div className="flex-1 mt-5">
        <label
          className={cn(
            'block text-left w-full font-nunito text-base mb-3',
            poppins_400.className
          )}
        >
          Subject Cover Image
        </label>
        <ImageUploader
          preview
          placeholder={
            <>
              Upload subject cover image <br />
              Drag & drop an image here, or click to select one
            </>
          }
          onImageSelected={handleImageSelected}
          initialImage={createSubject.coverImage}
          bordered
        />
      </div>
    </div>
  );
}

export default Step1;
