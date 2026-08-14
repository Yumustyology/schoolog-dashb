import React from 'react';
import { useFormik } from 'formik';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import { academicYearValidationSchema } from '@/app/lib/policy/academicYear.policy';
import { createAcademicYear } from '@/app/lib/actions/academicYear.actions';
import showToast from '@/app/lib/utils/toast';
import { CreateAcademicYearPayload } from '@/app/lib/types/academicYear.types';
import TermCard from '../dashboard/term-sessions/TermCard';
import {
  useAcademicYearForm,
  type AcademicYearFormValues,
} from '@/app/lib/hooks/useAcademicYearForm';

interface CreateAcademicYearFormProps {
  onSuccess?: () => void;
  countryCode: string;
}

const CreateAcademicYearForm: React.FC<CreateAcademicYearFormProps> = ({
  onSuccess,
  countryCode,
}) => {
  const initialValues: AcademicYearFormValues = {
    name: '',
    startDate: '',
    endDate: '',
    isActive: false,
    terms: [
        {
          id: crypto.randomUUID(),
          name: 'First Term',
          startDate: '',
          endDate: '',
          holidays: [],
          isCurrentlyActive: false,
        },
    ],
  };

  const formik = useFormik({
    initialValues,
    validate: (values: any) => {
      const { error } = academicYearValidationSchema.validate(values, {
        abortEarly: false,
      });

      if (!error) return {};

      const errors: any = {};
      error.details.forEach((detail) => {
        const path = detail.path.join('.');
        errors[path] = detail.message;
      });
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      if (
        values.isActive &&
        !values.terms.some((term) => term.isCurrentlyActive)
      ) {
        showToast(
          'Please set at least one term as active when the academic year is active',
          'academic-year-validation',
          { type: 'error' }
        );
        setSubmitting(false);
        return;
      }

      try {
        const payload: CreateAcademicYearPayload = {
          name: values.name,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
          isActive: values.isActive,
          terms: values.terms.map((term) => ({
            name: term.name,
            startDate: new Date(term.startDate).toISOString(),
            endDate: new Date(term.endDate).toISOString(),
            holidays: (term.holidays || []).map((h) => ({
              name: h.name,
              date: h.date,
              type: h.type,
            })),
            isCurrentlyActive: term.isCurrentlyActive || false,
          })),
        };

        await createAcademicYear(payload);

        showToast(
          'Academic year created successfully',
          'academic-year-created',
          { type: 'success' }
        );
        if (onSuccess) onSuccess();
      } catch (error: any) {
        console.error('Error creating academic year:', error);
        showToast(
          error?.response?.data?.message || 'An error occurred',
          'academic-year-error',
          { type: 'error' }
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    addTerm,
    removeTerm,
    updateTerm,
    addHoliday,
    removeHoliday,
    updateHoliday,
    setTerms,
  } = useAcademicYearForm(formik);

  return (
    <form className="space-y-5" onSubmit={formik.handleSubmit}>
      <Input
        label="Academic Session Name"
        placeholder={`e.g. ${new Date().getFullYear()}/${new Date().getFullYear() + 1} Academic Session`}
        value={formik.values.name}
        handleChange={(e) => formik.setFieldValue('name', e.target.value)}
        errMsg={
          formik.touched.name && formik.errors.name
            ? formik.errors.name
            : undefined
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          value={formik.values.startDate}
          handleChange={(e) =>
            formik.setFieldValue('startDate', e.target.value)
          }
          errMsg={
            formik.touched.startDate && formik.errors.startDate
              ? formik.errors.startDate
              : undefined
          }
        />
        <Input
          type="date"
          label="End Date"
          value={formik.values.endDate}
          handleChange={(e) => formik.setFieldValue('endDate', e.target.value)}
          errMsg={
            formik.touched.endDate && formik.errors.endDate
              ? formik.errors.endDate
              : undefined
          }
        />
      </div>

      <div className="flex items-center justify-between py-2 px-2 rounded-md transition hover:bg-gray-50">
        <span
          className={cn(
            'text-base font-medium text-neutral-700',
            poppins_400.className
          )}
        >
          Set as Currently Active Academic Year
        </span>
        <Checkbox
          checked={formik.values.isActive}
          onCheckedChange={(checked) =>
            formik.setFieldValue('isActive', checked === true)
          }
          className={cn(
            'h-5 w-5 rounded-sm border-2 transition-colors',
            'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white',
            'border-neutral-300 hover:border-primary/70 border-black',
            'focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          id="isActive"
        />
      </div>

      <br />
      <div>
        <p className={cn('mb-2 text-base mt-4', poppins_500.className)}>
          Terms / Semesters
        </p>
        <div className="space-y-4">
          {formik.values.terms.length > 0 ? (
            formik.values.terms.map((term, idx) => (
              <TermCard
                key={term.id}
                term={term}
                terms={formik.values.terms}
                countryCode={countryCode}
                updateTerm={updateTerm}
                removeTerm={removeTerm}
                addHoliday={addHoliday}
                removeHoliday={removeHoliday}
                updateHoliday={updateHoliday}
                setTerms={setTerms}
                errors={
                  formik.touched.terms?.[idx]
                    ? (formik.errors.terms?.[idx] as any)
                    : undefined
                }
              />
            ))
          ) : (
            <h2 className={cn('mb-2 text-base mt-4', poppins_500.className)}>No terms/semesters added yet.</h2>
          )}
        </div>
        <button
          type="button"
          onClick={addTerm}
          className={cn(
            'mt-3 flex items-center gap-2 text-primary text-sm',
            poppins_400.className
          )}
        >
          <AdditionIcon color="black" size={14} /> Add term/semester
        </button>
      </div>

      <Button
        round
        className="h-12 mt-6 w-fit"
        type="submit"
        disabled={formik.isSubmitting}
        loading={formik.isSubmitting}
      >
        Create Academic Year
      </Button>
    </form>
  );
};

export default CreateAcademicYearForm;
