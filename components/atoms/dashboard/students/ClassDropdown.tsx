import React from 'react'
import { SelectDropdown } from './SelectDropdown';

const classess = [
    { value: 'jss1', label: 'JSS 1' },
    { value: 'jss2', label: 'JSS 2' },
    { value: 'jss3', label: 'JSS 3' },
    { value: 'ss1', label: 'SSS 1' },
    { value: 'ss2', label: 'SSS 2' },
    { value: 'ss2', label: 'SSS 2' },
    { value: 'ss3', label: 'SSS 3' },
  ];
  
  
  export const ClassDropdown = ({width = 400, className}: {width?: number, className?: string}) => {
      return (
          <SelectDropdown options={classess} placeholder="Select Class" width={width} className={className}/>
  )
}
