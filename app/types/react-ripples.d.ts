declare module 'react-ripples' {
  import React from 'react';

  interface RipplesProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    color?: string;
    itemScope?: boolean;
    rippleRadius?: number;
  }

  const Ripples: React.FC<RipplesProps>;

  export default Ripples;
}
