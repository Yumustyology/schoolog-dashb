'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import AcademicYearForm from '@/components/molecules/acacamic-years/AcademicYearForm';
import { getAcademicYearById } from '@/app/lib/actions/academicYear.actions';
import useSWR from 'swr';

const EditAcademicYearPage = () => {
  const router = useRouter();
  const params = useParams();
  const academicYearId = params?.id as string;

  const { data, isLoading } = useSWR(
    academicYearId ? `/get-academic-year/${academicYearId}` : null,
    () => getAcademicYearById(academicYearId)
  );

  if (isLoading)
    return <div className="max-w-xl mx-auto py-10">Loading...</div>;

  return (
    <div className="p-10 min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg">
      <h1 className="text-2xl mb-6 font-semibold">Edit Academic Year</h1>
      <AcademicYearForm
        mode="edit"
        initialData={data?.data}
        onSuccess={() => {
          router.push('../');
        }}
      />
    </div>
  );
};

export default EditAcademicYearPage;
