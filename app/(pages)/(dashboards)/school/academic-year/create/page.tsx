'use client';

import React from "react";
import { useRouter } from "next/navigation";
import AcademicYearForm from "@/components/molecules/acacamic-years/AcademicYearForm"

const CreateAcademicYearPage = () => {
  const router = useRouter();
  return (
    <div className="p-10 min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg">
      <h1 className="text-2xl mb-6 font-semibold">Create Academic Year</h1>
      <AcademicYearForm
        mode="create"
        onSuccess={() => {
          router.push("../");
        }}
      />
    </div>
  );
};

export default CreateAcademicYearPage;
