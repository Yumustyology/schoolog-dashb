import React from 'react'
import { SelectDropdown } from '../students/SelectDropdown'


const statuses = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
]

export const AttendanceStatusDropdown = () => {
    return (
        <SelectDropdown options={statuses} placeholder="Status" width={100} />
    )
}
