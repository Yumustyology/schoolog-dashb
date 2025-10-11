"use client";

import React from 'react';
import Image from 'next/image';
import type { SchoolPublic } from '@/app/lib/types/school-info.types';

type Props = {
  school: SchoolPublic;
  onClick?: (s: SchoolPublic) => void;
};

export default function SchoolCard({ school, onClick }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(school)}
      className="p-3 border rounded flex items-center gap-4 hover:shadow cursor-pointer"
    >
      <Image
        src={school.school_image || '/school.png'}
        alt={school.name}
        width={48}
        height={48}
        className="object-cover rounded"
      />
      <div>
        <div className="font-semibold">{school.name}</div>
        <div className="text-sm text-gray-500">{school.country}</div>
      </div>
    </div>
  );
}
