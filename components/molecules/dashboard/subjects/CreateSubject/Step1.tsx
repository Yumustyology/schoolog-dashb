import Input from '@/components/atoms/form/Input';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import { useEntity } from 'simpler-state';
import ImageUploader from '@/components/atoms/form/ImageUploader';
import FormSectionHeader from './FormSectionHeader';
import DropdownMultiSelect, { OptionType } from '@/components/atoms/form/DropdownMultiSelect';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import { ClassGrade } from '@/app/lib/types/class.types';
import { useEffect, useState } from 'react';

function Step1() {
  const createSubject = useEntity(createSubjectEntity);
  const [classGradeOptions, setClassGradeOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    async function fetchClassGrades() {
      const resp = await classGradeActions.fetchClassGradesAll();
      if (resp && resp.data && Array.isArray(resp.data.data)) {
        setClassGradeOptions(
          (resp.data.data as ClassGrade[]).map((cg) => ({ value: cg._id, label: cg.name }))
        );
      }
    }
    fetchClassGrades();
  }, []);

  const handleImageSelected = (file: File | null) => {
    createSubjectEntity.set((prev) => ({ ...prev, coverImage: file }));
  };

  const updateName = (v: string) => {
    createSubjectEntity.set((prev) => ({ ...prev, name: v }));
  };

  const updateClassGrades = (vals: readonly OptionType[]) => {
    createSubjectEntity.set((prev) => ({ ...prev, classGrades: vals.map((v) => v.value) }));
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
        className="input h-[46px] rounded-lg"
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
          Select class/level(s)
        </label>
        <DropdownMultiSelect
          options={classGradeOptions}
          value={classGradeOptions.filter(opt => (createSubject.classGrades || []).includes(opt.value))}
          onChange={updateClassGrades}
          placeholder="Select class grades"
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
