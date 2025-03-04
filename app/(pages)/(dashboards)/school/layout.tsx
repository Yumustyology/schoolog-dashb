import LayoutClient from '../LayoutClient';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient sidebarType="school">{children}</LayoutClient>;
}
