import ParentInfoPage from './ParentInfoPage';

export async function generateStaticParams() {
  const parents = ['AS111', 'science', 'history', '1234'];

  return parents.map((parent) => ({
    parent, // Must match the dynamic segment `[student]`
  }));
}

export default function ParentPage({ params }: { params: { parent: string } }) {
  return <ParentInfoPage parent={params?.parent} />;
}
