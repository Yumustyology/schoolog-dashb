import Input from '@/components/atoms/form/Input';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { GenderSelectionDropdown } from '@/components/atoms/form/GenderSelectetionDropdown';
// import { ClassDropdown } from '@/components/atoms/dashboard/students/ClassDropdown';
import FileUploader from '@/components/atoms/form/FileUploader';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import { useEntity } from 'simpler-state';
import {
  createStudentEntity,
  CreateStudentEntity,
} from '@/app/lib/entities/student.entity';

interface Step1Props {
  showClassSelect?: boolean;
  classGradeName?: string | undefined;
}

function Step1({ showClassSelect, classGradeName }: Step1Props) {
  const student = useEntity<CreateStudentEntity>(createStudentEntity);
  const searchParams = useSearchParams();
  const classGradeQuery = searchParams?.get('classGrade') ?? undefined;
  const showSelect =
    typeof showClassSelect === 'boolean'
      ? showClassSelect
      : classGradeQuery === 'all' || !classGradeQuery;

  return (
    <div>
      <div className="mb-12 mt-6">
        <h2
          className={cn(
            'text-xl text-gray1 mb-1 text-center',
            poppins_500.className
          )}
        >
          Input the details of the student <br /> you want to upload
        </h2>
      </div>

      <form action="" method="post" className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              id="firstName"
              label="First name"
              type="text"
              labelClassName="label text-gray2 mb-0"
              className=" h-11 rounded-lg"
              name="firstName"
              placeholder="Input first name"
              value={student.firstName}
              handleChange={(e) =>
                createStudentEntity.set((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
          </div>

          <div>
            <Input
              id="lastName"
              label="Last name"
              type="text"
              labelClassName="label text-gray2 mb-0"
              className=" h-11 rounded-lg"
              name="lastName"
              placeholder="Input last name"
              value={student.lastName}
              handleChange={(e) =>
                createStudentEntity.set((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {showSelect ? (
              <div>
                <label className={cn('block text-left text-base w-full font-nunito mb-2', poppins_400.className)}>Class grade</label>
                <ClassGradeDropdown
                  value={student.classGrade ?? ''}
                  onValueChange={(v) => {
                    const id = Array.isArray(v) ? v[0] : v;
                    createStudentEntity.set((prev) => ({ ...prev, classGrade: id }));
                  }}
                  className='border border-[#E0E0E0] rounded-lg w-full p-4 outline-none flex items-center h-11'
                  initFirst
                />
              </div>
            ) : classGradeName ? (
              <Input
                id="classGradeName"
                label="Class grade"
                type="text"
                labelClassName="label text-gray2 mb-0"
                className=" h-11 rounded-lg"
                name="classGradeName"
                placeholder="Class grade"
                value={classGradeName}
                readOnly
                handleChange={() => {}}
              />
            ) : null}

            <div>
              <Input
                id="dob"
                label="Date of birth"
                type="date"
                labelClassName="label"
                className=" h-11 rounded-lg"
                name="dob"
                placeholder="Input date"
                value={student.dob ?? ''}
                handleChange={(e) =>
                  createStudentEntity.set((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            </div>
          </div>

          <div>
            <GenderSelectionDropdown
              value={student.gender ?? null}
              onChange={(v) => createStudentEntity.set((prev) => ({ ...prev, gender: v }))}
            />
          </div>
        </div>
      </form>

      <div className="mt-6">
        <FileUploader
          preview
          bordered
          placeholder={
            <>
              Upload student image <br />
              Drag & drop an image here, or click to select one
            </>
          }
          onFileSelected={(file) => createStudentEntity.set((prev) => ({ ...prev, image: file }))}
        />
      </div>
    </div>
  );
}

export default Step1;
