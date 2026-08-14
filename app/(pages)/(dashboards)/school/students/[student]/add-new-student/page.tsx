"use client";

import AddNewStudentTopSteps from '@/components/molecules/dashboard/students/AddNewStudentTopSteps';
import { useParams } from 'next/navigation';

export default function PageWrapper() {
  const params = useParams();
  const cls = params?.student as string | undefined;
  return <AddNewStudentTopSteps showClassSelect={false} initialClassId={cls} />;
}
