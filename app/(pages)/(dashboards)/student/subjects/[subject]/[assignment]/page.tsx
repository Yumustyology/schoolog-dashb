import AssignmentInfoPage from './AssignmentInfoPage';

// export async function generateStaticParams() {
//   const res = await fetch("https://api.example.com/subjects");
//   const subjects = await res.json();

//   const assignmentsRes = await fetch("https://api.example.com/assignments");
//   const assignments = await assignmentsRes.json();

//   return subjects.flatMap((subject: string) =>
//     assignments.map((assignment: string) => ({
//       subject,
//       assignment,
//     }))
//   );
// }

export async function generateStaticParams() {
  const subjects = ['1234', 'science', 'history', '1234'];
  const assignments = ['1234', 'assignment2', 'assignment3'];

  return subjects.flatMap((subject) =>
    assignments.map((assignment) => ({
      subject,
      assignment,
    }))
  );
}

export default function Page({
  params,
}: {
  params: { subject: string; assignment: string };
}) {
  return <AssignmentInfoPage />;
}
