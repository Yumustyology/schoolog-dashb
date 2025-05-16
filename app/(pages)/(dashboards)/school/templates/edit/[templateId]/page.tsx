import EditTemplatePage from './EditTemplatePage';

// export async function generateStaticParams() {
//   const res = await fetch("https://api.example.com/subjects");
//   const subjects = await res.json();

//   return subjects.map((subject: string) => ({
//     subject,
//   }));
// }

export async function generateStaticParams() {
  const templateIds = ['math', 'science', 'history', '1234'];
  return templateIds.map((templateId) => ({
    templateId,
  }));
}

export default function TemplateEditPage() {
  // {
  //   params,
  // }: {
  //   params: { templateId: string };
  // }
  return <EditTemplatePage />;
}
