'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Particles } from './magicui/particles';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

export function ParticlesComp() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState('#09B451');
  const { theme } = useSlgTheme();
  useEffect(() => {
    setColor(resolvedTheme === 'dark' ? '#ffffff' : theme.primary);
  }, [resolvedTheme, theme.primary]);

  return (
    <Particles
      className="absolute inset-0 z-0"
      quantity={100}
      ease={80}
      color={color}
      refresh
    />
  );
}
