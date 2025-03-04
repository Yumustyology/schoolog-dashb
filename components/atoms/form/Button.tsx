'use client';

import React, { ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Ripples from 'react-ripples';
import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { poppins_500 } from '@/app/lib/config/font.config';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  flat?: boolean;
  to?: string;
  download?: boolean;
  loaderSize?: number;
  wide?: boolean;
  outlined?: boolean;
  round?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  span?: boolean;
  loaderColor?: string;
  childrenClassName?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  children,
  loaderSize = 25,
  className,
  flat,
  to,
  download,
  type,
  wide,
  outlined,
  loading,
  round,
  onClick,
  disabled,
  loaderColor,
  id,
  childrenClassName,
  span,
  ...props
}: ButtonProps) => {
  const commonClasses = cn(
    wide && 'flex-grow w-full',
    outlined && 'border border-primary',
    round ? 'rounded-full' : 'rounded-lg',
    'inline-block py-2 px-4 font-medium flex items-center justify-center cursor-pointer flex-shrink-0 font-nunito font-normal',
    flat ? 'text-primary bg-white' : 'bg-primary text-white',
    poppins_500.className,
    className
  );

  const commonProps = {
    className: commonClasses,
    disabled: disabled || loading,
    id,
  };

  if (to) {
    if (disabled) {
      return (
        <span {...props} {...commonProps}>
          {children}
        </span>
      );
    } else {
      return (
        <Link download={download} href={to} className="overflow-hidden">
          <button
            type={type}
            {...props}
            disabled={commonProps.disabled}
            id={commonProps.id}
            className={cn(wide && 'w-full flex-grow')}
          >
            <div
              id={commonProps.id}
              className={cn(
                'hover:!shadow-none !shadow-none inline-block',
                commonProps.className
              )}
              onClick={onClick}
              itemScope
            >
              <p
                className={cn(
                  'text-clash-grotesk font-medium flex items-center justify-center space-x-2',
                  childrenClassName
                )}
              >
                {loading ? (
                  <FaSpinner
                    className="animate-spin"
                    color={loaderColor}
                    size={loaderSize}
                  />
                ) : (
                  children
                )}
              </p>
            </div>
          </button>
        </Link>
      );
    }
  }

  if (span) {
    return (
      <span
        {...props}
        {...commonProps}
        onClick={() => {
          if (disabled) return;
          if (onClick) onClick();
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      type={type}
      {...props}
      disabled={commonProps.disabled}
      id={commonProps.id}
      className={cn(wide && 'w-full flex-grow h-auto')}
    >
      <Ripples
        id={commonProps.id}
        className={cn(
          'hover:!shadow-none !shadow-none inline-block',
          commonProps.className
        )}
        onClick={onClick}
        itemScope
      >
        <div
          className={cn(
            'text-clash-grotesk font-medium flex items-center justify-center space-x-2',
            childrenClassName
          )}
        >
          {loading ? (
            <FaSpinner
              className="animate-spin"
              color={loaderColor}
              size={loaderSize}
            />
          ) : (
            children
          )}
        </div>
      </Ripples>
    </button>
  );
};

export default Button;
