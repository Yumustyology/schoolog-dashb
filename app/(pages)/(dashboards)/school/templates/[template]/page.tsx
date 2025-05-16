import TemplateInfo from './TemplateInfo';

// export async function generateStaticParams() {
//   const res = await fetch("https://api.example.com/subjects");
//   const subjects = await res.json();

//   return subjects.map((subject: string) => ({
//     subject,
//   }));
// }

export async function generateStaticParams() {
  const templates = ['math', 'science', 'history', '1234'];
  return templates.map((template) => ({
    template,
  }));
}

export default function TemplatePage() {
  // {
  //     params,
  // }: {
  //   params: { subject: string };
  // }
  return <TemplateInfo />;
}
