import React, { useMemo } from 'react';
import { schoolState } from '@/app/lib/entities/school.entity';
import { getCountryCode } from '@/app/lib/utils/countryCode';
import { AcademicYear } from '@/app/lib/types/academicYear.types';
import EditAcademicYearForm from './EditAcademicYearForm';
import CreateAcademicYearForm from './CreateAcademicYearForm';

export interface AcademicYearFormProps {
  mode: 'create' | 'edit';
  initialData?: AcademicYear;
  onSuccess?: () => void;
}

const AcademicYearForm: React.FC<AcademicYearFormProps> = ({
  mode,
  initialData,
  onSuccess,
}) => {
  const school = schoolState.get();

  const countryCode = useMemo(
    () => getCountryCode(school?.country || '') || 'ng',
    [school]
  );

  if (mode === 'edit' && initialData) {
    return (
      <EditAcademicYearForm
        initialData={initialData}
        onSuccess={onSuccess}
        countryCode={countryCode}
      />
    );
  }

  return (
    <CreateAcademicYearForm
      onSuccess={onSuccess}
      countryCode={countryCode}
    />
  );
};

export default AcademicYearForm;