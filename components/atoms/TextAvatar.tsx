import React from 'react';
import { getInitials } from '@/app/lib/utils';

interface TextAvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
  className?: string;
  colorClass?: string; // e.g. 'bg-primary', 'bg-blue-500'
}

const TextAvatar: React.FC<TextAvatarProps> = ({
  firstName,
  lastName,
  size = 32,
  className = '',
  colorClass = 'bg-primary',
}) => {
  const initials = getInitials(firstName, lastName);
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border border-white shadow ${colorClass} ${className}`}
      style={{ width: size, height: size }}
      title={`${firstName} ${lastName}`}
    >
      <span className="text-xs font-bold text-white select-none pointer-events-none uppercase">
        {initials}
      </span>
    </div>
  );
};

export default TextAvatar;
