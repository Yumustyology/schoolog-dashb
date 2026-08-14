'use client';

import React from 'react';
import { useFormik } from 'formik';
import useSWR from 'swr';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import SelectComp from '@/components/atoms/form/Select';
import { fetchGuardianById } from '@/app/lib/actions/guardian.actions';
import { Inter_500 } from '@/app/lib/config/font.config';
import { RELATIONSHIP_OPTIONS } from '@/assets/constants/relationshipOptions';

export interface GuardianFormValues {
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  address: string;
  wards: string[];
}

export interface GuardianFormProps {
  initialValues?: Partial<GuardianFormValues>;
  onSubmit?: (values: GuardianFormValues) => void;
  submitLabel?: string;
  guardianId?: string;
}

export const GuardianForm: React.FC<GuardianFormProps> = ({
  initialValues = {},
  onSubmit,
  submitLabel = 'Save change',
  guardianId,
}) => {
  const { data: guardianData, isLoading } = useSWR(
    guardianId ? ['guardian', guardianId] : null,
    async ([, id]) => fetchGuardianById(id)
  );

  const editValues = guardianData?.data
    ? {
        firstName: guardianData.data.firstName ?? '',
        lastName: guardianData.data.lastName ?? '',
        relationship: guardianData.data.relationship ?? '',
        email: guardianData.data.email ?? '',
        phoneNumber: guardianData.data.phoneNumber ?? '',
        secondaryPhoneNumber: guardianData.data.secondaryPhoneNumber ?? '',
        address: guardianData.data.address ?? '',
        wards: Array.isArray(guardianData.data.wards)
          ? guardianData.data.wards.map((w: any) =>
              typeof w === 'string' ? w : w._id
            )
          : [],
      }
    : null;

  const formik = useFormik({
    initialValues: {
      firstName: editValues?.firstName ?? initialValues.firstName ?? '',
      lastName: editValues?.lastName ?? initialValues.lastName ?? '',
      relationship:
        editValues?.relationship ?? initialValues.relationship ?? '',
      email: editValues?.email ?? initialValues.email ?? '',
      phoneNumber: editValues?.phoneNumber ?? initialValues.phoneNumber ?? '',
      secondaryPhoneNumber:
        editValues?.secondaryPhoneNumber ??
        initialValues.secondaryPhoneNumber ??
        '',
      address: editValues?.address ?? initialValues.address ?? '',
      wards: editValues?.wards ?? initialValues.wards ?? [],
    },
    enableReinitialize: true,
    onSubmit: (values) => onSubmit?.(values),
  });

  if (guardianId && isLoading) {
    return <div className="py-8 text-center">Loading guardian data...</div>;
  }

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First name"
          name="firstName"
          placeholder="Enter first name"
          value={formik.values.firstName}
          handleChange={formik.handleChange}
        />

        <Input
          label="Last name"
          name="lastName"
          placeholder="Enter last name"
          value={formik.values.lastName}
          handleChange={formik.handleChange}
        />

        <SelectComp
          label="Relationship"
          value={formik.values.relationship}
          onValueChange={(val) =>
            formik.setFieldValue('relationship', val)
          }
          triggerClasses='h-[46px]'
          labelClassName='mb-3 text-black'
          options={RELATIONSHIP_OPTIONS}
          placeholder="Select relationship"
        />

        <Input
          label="Guardian email"
          type="email"
          name="email"
          placeholder="Enter guardian's email"
          value={formik.values.email}
          handleChange={formik.handleChange}
        />

        <Input
          label="Guardian phone number"
          name="phoneNumber"
          placeholder="Enter guardian's phone number"
          value={formik.values.phoneNumber}
          handleChange={formik.handleChange}
          required={false}
        />

        <Input
          label="Secondary phone number"
          name="secondaryPhoneNumber"
          placeholder="Enter secondary phone number"
          value={formik.values.secondaryPhoneNumber}
          handleChange={formik.handleChange}
          required={false}
        />

        <Input
          label="Guardian address"
          name="address"
          placeholder="Enter address"
          value={formik.values.address}
          handleChange={formik.handleChange}
          required={false}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className={`bg-primary text-white px-8 py-2 rounded-full ${Inter_500.className}`}
          loading={formik.isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
