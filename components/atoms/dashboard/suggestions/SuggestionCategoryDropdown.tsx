import React from 'react'
import { SelectDropdown } from '../students/SelectDropdown';


const categories = [
    { value: 'parents', label: 'Parents' },
    { value: 'students', label: 'Students' },
    { value: 'teachers', label: 'Teachers' },

  ];
  
  
  export const SuggestionCategoryDropdown = ({width = 120, className}: {width?: number, className?: string}) => {
      return (
          <SelectDropdown options={categories} placeholder="Category" width={width} className={className}/>
  )
}
