import { Inter_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import UserAvatar from '@/components/atoms/UserAvatar';

function ImageOptionBox({
  name,
  img,
  role,
}: {
  name: string;
  img?: string;
  role?: string;
}) {
  return (
    <div className="flex items-center gap-3 w-full">
      <UserAvatar image={img} name={name} size={36} />
      <div>
        <h1 className={cn('text-sm text-gray1 font-medium', Inter_400.className)}>
          {name}
        </h1>
        {role ? (
          <p className={cn('text-xs text-gray3', Inter_400.className)}>
            {role.includes('@') || role.toLowerCase().includes('teacher')
              ? role
              : `Assigned to ${role}`}
          </p>
        ) : (
          <p className={cn('text-xs text-gray3', Inter_400.className)}>
            No assigned subject
          </p>
        )}
      </div>
    </div>
  );
}
export default ImageOptionBox;
