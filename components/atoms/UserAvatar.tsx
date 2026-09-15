'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TextAvatar from './TextAvatar';

export interface UserAvatarProps {
  image?: string | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  size?: number;
  className?: string;
  colorClass?: string;
  textClassName?: string;
  alt?: string;
  title?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  image,
  name,
  firstName,
  lastName,
  email,
  size = 36,
  className = '',
  colorClass,
  textClassName = '',
  alt,
  title,
}) => {
  const [imgError, setImgError] = useState(false);

  const hasImage = Boolean(
    image &&
      typeof image === 'string' &&
      image.trim().length > 0 &&
      !imgError
  );

  if (hasImage && image) {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex-shrink-0 select-none border border-gray-200/60 ${className}`}
        style={{ width: size, height: size }}
        title={title || name || `${firstName || ''} ${lastName || ''}`.trim() || 'User'}
      >
        <Image
          src={image}
          alt={alt || name || `${firstName || ''} ${lastName || ''}`.trim() || 'User Avatar'}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          unoptimized={image.startsWith('http') || image.startsWith('data:')}
        />
      </div>
    );
  }

  return (
    <TextAvatar
      name={name}
      firstName={firstName}
      lastName={lastName}
      email={email}
      size={size}
      className={className}
      colorClass={colorClass}
      textClassName={textClassName}
      title={title}
    />
  );
};

export default UserAvatar;
