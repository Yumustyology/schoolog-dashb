import AvatarIcon from '@/components/atoms/AvatarIcon';

export default function TeacherAvatar(props: { className?: string }) {
  // keep compatibility: render generic AvatarIcon with default size
  return <AvatarIcon size={32} className={props.className} />;
}
