'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';


export function DurationDropdown() {

    const [selectedDuration, setSelectedDruration] = useState('');
    const durations = [
        { value: '2days', label: '2 days' },
        { value: '3days', label: '3 days' },
        { value: '5days', label: '5 days' },
        { value: '1week', label: '1 week' },
        { value: '2week', label: '2 weeks' },
        { value: '3week', label: '3 weeks' },
    ]

    return (
        <>
            <Dropdown label='Duration' options={durations} selectedOption={selectedDuration} onChange={setSelectedDruration} placeholder="Select duration" />
        </>
    );
}
