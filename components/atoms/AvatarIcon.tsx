import Image from 'next/image';
import React from 'react';
import { GenericPersonIcon } from '@/components/atoms/icons/Icons';

type AvatarIconProps = {
  src?: string | null;
  alt?: string;
  size?: number; // px
  className?: string;
};

export default function AvatarIcon({ src, alt = 'avatar', size = 40, className = '' }: AvatarIconProps) {
  const rounded = 'rounded-full';

  if (src) {
    return (
      <div style={{ width: size, height: size }} className={"overflow-hidden bg-gray-100 " + className}>
        <Image src={src} alt={alt} width={size} height={size} className={"object-cover " + rounded} style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }

  // Generic SVG fallback, matches student-list icon style
  return (
    <div style={{ width: size, height: size }} className={"flex items-center justify-center bg-gray4 text-gray3 " + rounded + ' ' + className}>
      <GenericPersonIcon size={Math.floor(size * 0.6)} />
    </div>
  );
}
