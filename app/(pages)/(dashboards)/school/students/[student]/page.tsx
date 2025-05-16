import StudentInfoPage from './StudentInfoPage';

export async function generateStaticParams() {
  const students = ['AS111', 'science', 'history', '1234'];

  return students.map((student) => ({
    student, // Must match the dynamic segment `[student]`
  }));
}

export default function StudentPage({
  params,
}: {
  params: { student: string };
}) {
  return <StudentInfoPage student={params.student} />;
}
