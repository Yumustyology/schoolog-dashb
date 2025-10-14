'use client';

import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  ReactNode,
  useState,
} from 'react';
import { ClassValue } from 'clsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';

type inputProps = {
  type?: HTMLInputTypeAttribute | 'textarea';
  inputClassName?: ClassValue;
  label?: string;
  id?: string;
  value?: string | number;
  required?: boolean;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  placeholder?: string;
  errMsg?: string | null;
  min?: number;
  max?: number;
  maxLength?: number | null;
  minLength?: number | null;
  autoComplete?: 'on' | 'off';
  name?: string;
  register?: any;
  errMsgClassName?: string;
  disabled?: boolean;
  labelClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rows?: number; // For textarea
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

const Input: FC<inputProps> = ({
  type = 'text',
  label,
  className,
  inputClassName,
  id,
  value,
  handleChange,
  required = true,
  name = '',
  placeholder,
  errMsg,
  min,
  handleBlur,
  max,
  errMsgClassName,
  maxLength,
  minLength,
  autoComplete,
  register,
  labelClassName,
  disabled,
  // leftIcon,
  rightIcon,
  rows = 4,
  ...props
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'block text-left w-full font-nunito text-base mb-3',
            poppins_400.className,
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'border border-[#E0E0E0] rounded-lg w-full p-4 outline-none flex items-center',
          type !== 'textarea' && 'h-[46px]',
          className
        )}
      >
        {type === 'textarea' ? (
          <textarea
            className={cn(
              'bg-transparent w-full outline-none font-nunito',
              poppins_400.className,
              inputClassName
            )}
            {...props}
            value={value}
            required={required}
            name={name}
            onChange={handleChange}
            id={id}
            placeholder={placeholder || ' '}
            onBlur={handleBlur}
            rows={rows}
            {...register}
            disabled={disabled}
          />
        ) : (
          <input
            className={cn(
              'bg-transparent w-full outline-none font-nunito',
              poppins_400.className,
              inputClassName
            )}
            {...props}
            value={value}
            required={required}
            name={name}
            onChange={handleChange}
            type={passwordShown ? 'text' : type}
            id={id}
            placeholder={placeholder || ' '}
            onBlur={handleBlur}
            min={min}
            max={max}
            maxLength={maxLength}
            minLength={minLength}
            disabled={disabled}
            autoComplete={autoComplete}
            {...register}
          />
        )}

        {type === 'password' && (
          <div
            className="flex items-center cursor-pointer mx-4 no-select"
            onClick={() => setPasswordShown(!passwordShown)}
          >
            {passwordShown ? (
              <AiOutlineEye color="#737178" size={20} />
            ) : (
              <AiOutlineEyeInvisible color="#737178" size={20} />
            )}
          </div>
        )}
        {rightIcon && type !== 'password' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {errMsg ? (
        <p
          className={cn(
            `text-xs w-fit text-left mt-1 font-nunito`,
            errMsgClassName,
            'text-[indianred]'
          )}
        >
          {errMsg}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
