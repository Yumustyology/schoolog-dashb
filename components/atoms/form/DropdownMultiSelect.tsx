import React from "react";
import Select, { MultiValue } from "react-select";

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
}

const DropdownMultiSelect: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Search...",
  isSearchable = true,
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isMulti={true} // Enforce multi-select
      styles={{
        control: (base, state) => ({
          ...base,
          padding: "2px",
          borderRadius: "8px",
          height: '44px',
          fontSize: "12px",
          borderColor: state.isFocused ? "#1d4241" : "rgb(229, 229, 229);",
          boxShadow: state.isFocused ? "#1d4241" : "none",
          "&:hover": {
            borderColor: "#1d4241",
          },
        }),

        menu: (base) => ({
          ...base,
          marginTop: "6px",
          padding: "8px",
          borderRadius: "8px",
          borderColor: "#e5e7eb",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          padding: "10px",
          cursor: "pointer",
          borderColor: '#1d4241',
          borderRadius: "4px",
          fontSize: "12px",
          backgroundColor: isSelected ? "#21B55A" : isFocused ? "#f2f2f2" : "white",
          color: isSelected ? "white" : "#111827",
          "&:hover": {
            backgroundColor: isSelected ? "#21B55A" : "#f2f2f2",
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#f2f2f2",
          borderRadius: "4px",
          padding: "4px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#1d4241",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#D92D20",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }),
      }}
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
