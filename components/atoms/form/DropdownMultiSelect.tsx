import { poppins_400 } from '@/app/lib/config/font.config';
import React from 'react';
import Select, { MultiValue } from 'react-select';

export interface OptionType {
  value: string;
  label: string;
}

interface DropdownProps {
  options: OptionType[];
  value: MultiValue<OptionType>;
  onChange: (newValue: MultiValue<OptionType>) => void;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DropdownMultiSelect: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Search...',
  isSearchable = true,
  className,
  style,
  ...rest
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isMulti={true} // Enforce multi-select
      className={className}
      styles={{
        control: (base, state) => ({
          ...base,
          padding: '2px',
          borderRadius: '8px',
          height: style?.height || '46px',
          minHeight: style?.minHeight || '44px',
          fontSize: style?.fontSize || '16px',
          fontFamily: poppins_400.style.fontFamily || style.fontFamily || base.fontFamily,
          borderColor: state.isFocused ? '#1d4241' : 'rgb(229, 229, 229);',
          boxShadow: state.isFocused ? '#1d4241' : 'none',
          ...style,
          '&:hover': {
            borderColor: '#1d4241',
          },
        }),
        menu: (base) => ({
          ...base,
          marginTop: '6px',
          padding: '8px',
          borderRadius: '8px',
          borderColor: '#e5e7eb',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          fontSize: style?.fontSize || '12px',
          fontFamily: style?.fontFamily || base.fontFamily,
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          padding: '10px',
          cursor: 'pointer',
          borderColor: '#1d4241',
          borderRadius: '4px',
          fontSize: style?.fontSize || '12px',
          fontFamily: style?.fontFamily || base.fontFamily,
          backgroundColor: isSelected
            ? '#21B55A'
            : isFocused
              ? '#f2f2f2'
              : 'white',
          color: isSelected ? 'white' : '#111827',
          '&:hover': {
            backgroundColor: isSelected ? '#21B55A' : '#f2f2f2',
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: '#f2f2f2',
          borderRadius: '4px',
          padding: '4px',
          fontSize: style?.fontSize || '12px',
          fontFamily: style?.fontFamily || base.fontFamily,
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: '#1d4241',
          fontSize: style?.fontSize || '12px',
          fontFamily: style?.fontFamily || base.fontFamily,
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: '#D92D20',
          cursor: 'pointer',
          fontSize: style?.fontSize || '12px',
          fontFamily: style?.fontFamily || base.fontFamily,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }),
      }}
      {...rest}
    />
  );
};

export default DropdownMultiSelect;

// import React from "react";
// import Select, { MultiValue } from "react-select";

// export interface OptionType {
//   value: string;
//   label: string;
// }

// interface DropdownProps {
//   options: OptionType[];
//   value: MultiValue<OptionType>;
//   onChange: (newValue: MultiValue<OptionType>) => void;
//   placeholder?: string;
//   isSearchable?: boolean;
//   width?: string; // Allow custom width
// }

// const DropdownMultiSelect: React.FC<DropdownProps> = ({
//   options,
//   value,
//   onChange,
//   placeholder = "Search...",
//   isSearchable = true,
//   width = "300px", // Default width
// }) => {
//   return (
//     <Select
//       options={options}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       isSearchable={isSearchable}
//       isMulti={true} // Enforce multi-select
//       styles={{
//         control: (base, state) => ({
//           ...base,
//           minWidth: width,
//           maxWidth: width, // Maintain size
//           padding: "2px",
//           borderRadius: "8px",
//           height: "44px",
//           fontSize: "12px",
//           borderColor: state.isFocused ? "#1d4241" : "rgb(229, 229, 229);",
//           boxShadow: state.isFocused ? "#1d4241" : "none",
//           "&:hover": {
//             borderColor: "#1d4241",
//           },
//           display: "flex",
//           flexWrap: "nowrap", // Prevent wrapping of selected items
//           overflow: "hidden",
//         }),
//         valueContainer: (base) => ({
//           ...base,
//           display: "flex",
//           flexWrap: "nowrap",
//           overflow: "hidden",
//           minWidth: "100%",
//         }),
//         multiValue: (base) => ({
//           ...base,
//           backgroundColor: "#f2f2f2",
//           borderRadius: "4px",
//           padding: "4px",
//           display: "inline-flex", // Ensure inline behavior
//           whiteSpace: "nowrap",
//           flexShrink: 0, // Prevent shrinking
//         }),
//         multiValueLabel: (base) => ({
//           ...base,
//           color: "#1d4241",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           whiteSpace: "nowrap",
//           maxWidth: "80px", // Prevents long items from breaking layout
//         }),
//         multiValueRemove: (base) => ({
//           ...base,
//           color: "#D92D20",
//           cursor: "pointer",
//           "&:hover": {
//             backgroundColor: "transparent",
//           },
//         }),
//       }}
//     />
//   );
// };

// export default DropdownMultiSelect;
