import React from 'react'
import { SelectDropdown } from './SelectDropdown'

const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'suspend', label: 'Suspend' },
    { value: 'left', label: 'Left' },

]
export const StatusDropdown = () => {
    return (
        <SelectDropdown options={statuses} placeholder="Status" width={100} />
    )
}
