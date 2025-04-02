import { poppins_400 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import React from 'react'

interface Option {
    label: string
    value: string
}

interface RadioOptionTypesProps {
    options: Option[]
    selectedOption: string
    setSelectedOption: (value: string) => void
}


export const RadioOptionType: React.FC<RadioOptionTypesProps> = ({ options, selectedOption, setSelectedOption}) => {

    const handleSelection = (value: string) => {
        setSelectedOption(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, value: string) => {
        if (e.key === 'Enter') {
            handleSelection(value)
        }
    }

    return (
        <div className="flex gap-4">
            {options.map((option) => (
                <div
                    key={option.value}
                    className={cn(
                        'flex items-center text-sm space-x-2 py-2.5 px-4 border rounded-full cursor-pointer transition-all',
                        selectedOption === option.value ? 'bg-primary text-white' : 'bg-gray11 text-gray3',
                        'focus:outline-primary',
                        poppins_400.className)}
                    tabIndex={0}
                    onClick={() => handleSelection(option.value)}
                    onKeyDown={(e) => handleKeyDown(e, option.value)}
                    role="radio"
                    aria-checked={selectedOption === option.value}
                >
                    <span
                        className={cn(
                            'w-4 h-4 border rounded-full flex items-center justify-center',
                            selectedOption === option.value ? 'border-white' : 'border-gray3 bg-white'
                        )}
                    >
                        {selectedOption === option.value && (
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        )}
                    </span>
                    <span className="">{option.label}</span>
                </div>
            ))}
        </div>
    )
}




