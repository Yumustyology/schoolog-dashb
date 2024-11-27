// import React from 'react'

// type InputType = {
//   labelName: 'Full name' | 'Email' | 'Password' | 'Confirm Password'
//   type: 'text' | 'password' | 'email',
//   placeholder: string,
//   name: string,
// }
// function Input({type, placeholder, name, labelName}: InputType) {
//   return (
      
//     <div className='mb-4'>
//       <label htmlFor="" className='label'>
//         {labelName}
//       </label>
//       <input type={type} name={name} className='input' placeholder={placeholder}/>
//     </div>
//   )
// }

// export default Input


import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  ReactNode,
  useState,
} from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import cn from "../../../lib/utils/cn";
import { ClassValue } from "clsx";
import EyeOpen from "../../atoms/icons/EyeOpen";
import EyeClose from "../../atoms/icons/EyeClose";

type inputProps = {
  type?: HTMLInputTypeAttribute;
  inputClassName?: ClassValue;
  label?: string;
  id?: string;
  value?: string | number;
  required?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?:   (e: React.FocusEvent<any>)=> void;
  placeholder?: string;
  errMsg?: string | null;
  min?: number;
  max?: number;
  maxLength?: number | null;
  minLength?: number | null;
  autoComplete?: "on" | "off";
  name?: string;
  register?: any;
  disabled?: boolean; 
  labelClassName?: string;
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> ;

const Input: FC<inputProps> = ({
  type = "text",
  label,
  className,
  inputClassName,
  id,
  value,
  handleChange,
  required = true,
  name = "",
  placeholder,
  errMsg,
  min,
  handleBlur,
  max,
  maxLength,
  minLength,
  autoComplete,
  register,
  labelClassName,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={cn(
          "block text-left w-full font-nunito text-base mb-3",
          labelClassName
        )}
      >
        {label}
      </label>
      <div
        className={cn(
          "border border-[#E0E0E0] rounded-lg w-full p-4 outline-none flex items-center",
          className
        )}
      >
        <input
          className={cn(
            "bg-transparent text-wmt-black-500 w-full outline-none font-nunito",
            inputClassName
          )}
          {...props}
          value={value}
          required={required}
          name={name}
          onChange={handleChange}
          type={passwordShown ? "text" : type}
          id={id}
          placeholder={placeholder || " "}
          min={min}
          max={max}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          autoComplete={autoComplete}
          {...register}
        />

        {type === "password" && (
          <div className="flex items-center cursor-pointer mx-4 no-select" onClick={() => setPasswordShown(!passwordShown)}>
            {passwordShown ? (
              <EyeOpen />
            ) : (
              <EyeClose />
            )}
          </div>
        )}
      </div>
      <span
        className={`text-[indianred] text-2 w-fit text-left float-left mt-0`}
      >
        {errMsg}
      </span>
    </div>
  );
};

export default Input;