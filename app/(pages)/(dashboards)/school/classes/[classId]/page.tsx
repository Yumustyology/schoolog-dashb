import ClassGradeInfoPage from './ClassGradeInfo';

// export async function generateStaticParams() {
//   const res = await fetch("https://api.example.com/subjects");
//   const subjects = await res.json();

//   return subjects.map((classId: string) => ({
//     classId,
//   }));
// }

export async function generateStaticParams() {
  const subjects = ['math', 'science', 'history', '1234'];
  return subjects.map((classId) => ({
    classId,
  }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <ClassGradeInfoPage classId={classId} />;
}
