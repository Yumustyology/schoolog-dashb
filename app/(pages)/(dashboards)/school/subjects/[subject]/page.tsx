import SubjectInfoPage from './SubjectInfo';

// export async function generateStaticParams() {
//   const res = await fetch("https://api.example.com/subjects");
//   const subjects = await res.json();

//   return subjects.map((subject: string) => ({
//     subject,
//   }));
// }

// export async function generateStaticParams() {
//   const subjects = ['math', 'science', 'history', '1234'];
//   return subjects.map((subject) => ({
//     subject,
//   }));
// }

export default async function SubjectPage({
  params,
}: {
  params: { subject: string };
}) {
  const resolved = await params;
  return <SubjectInfoPage subject={resolved.subject} />;
}
