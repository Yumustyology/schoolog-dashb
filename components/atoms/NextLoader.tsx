'use client';

import React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

const NextLoader = ({}) => {
  
 const {theme} = useSlgTheme()

  return (
    <NextTopLoader
      color={theme.primary}
      initialPosition={0.09}
      crawlSpeed={100}
      height={3}
      crawl={false}
      showSpinner={false}
      easing="ease"
      speed={100}
      shadow={`0 0 10px ${theme.primary}, 0 0 5px ${theme.primary}`}
    />
  );
};

export default NextLoader;
