import React from 'react';

type DotProps = {
  size?: number;
  color?: string;
};

function Dot({ size = 2, color = '#D9D9D9' }: DotProps) {
  return (
    <div
      className={`h-${size} w-${size} rounded-full`}
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default Dot;
