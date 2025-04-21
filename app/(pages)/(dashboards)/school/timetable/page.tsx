'use client';

import { setTheme, themeState } from '@/app/lib/entities/theme.entity';
import { themes } from '@/app/lib/themes/themeConfig';
import React from 'react';

const Page = () => {
  const currentTheme = themeState.use();
  return (
    <div>
      foo
      <select
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value as keyof typeof themes)}
        className="border p-2 rounded"
      >
        {Object.keys(themes).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Page;
