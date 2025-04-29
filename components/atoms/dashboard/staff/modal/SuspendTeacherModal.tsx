'use client'
import { poppins_400 } from '@/app/lib/config/font.config';
import { closeSuspendTeacherModal, isSuspendTeacherModalOpen } from '@/app/lib/entities/staff.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import { Dropdown } from '@/components/atoms/form/Dropdown';
import Input from '@/components/atoms/form/Input';
import Modal from '@/components/molecules/Modal';
import React from 'react';
import { useEntity } from 'simpler-state';

export const SuspendTeacherModal = () => {
    const offences = [
        { value: 'lateness', label: 'Lateness to School' },
        { value: 'truancy', label: 'Truancy (Skipping Classes)' },
        { value: 'fighting', label: 'Fighting' },
        { value: 'bullying', label: 'Bullying' },
        { value: 'disobedience', label: 'Disobedience to Authority' },
        { value: 'vandalism', label: 'Vandalism' },
        { value: 'theft', label: 'Theft' },
        { value: 'cheating', label: 'Cheating in Exams' },
        { value: 'others', label: 'Others' },
    ];

    const durations = [
        { value: '1Month', label: '1 Month' },
        { value: '3Week', label: '3 Week' },
        { value: '2Week', label: '2 Week' },
        { value: '1Week', label: '1 Week' },
        { value: '5Days', label: '5 Days' },
        { value: '2days', label: '2 days' },
    ]

    const [selectedOffence, setSelectedOffence] = React.useState('')
    const [selectedDuration, setSelectedDuration] = React.useState('')

    const suspendTeacherModalOpen = useEntity(isSuspendTeacherModalOpen)

    return (
        <div>
            <Modal
                isOpen={suspendTeacherModalOpen}
                onClose={closeSuspendTeacherModal}
                title="Suspend"
            >
                <p className={cn('text-base text-center text-black1 mb-6', poppins_400.className)}>Let the teacher know the reason of the suspension</p>

                <div className='flex flex-col gap-5'>

                    <Dropdown label='Title' options={offences} selectedOption={selectedOffence} onChange={setSelectedOffence} placeholder="Select offence" />
                    <Dropdown label='Duration' options={durations} selectedOption={selectedDuration} onChange={setSelectedDuration} placeholder="Select duration" />
                    <Input
                        type='textarea'
                        label='Description'
                        placeholder='explain the isssue here'
                        labelClassName={cn('text-base text-gray6 mb-2', poppins_400.className)}
                        className=''
                    />
                </div>
                <Button wide round className="h-12 mt-8 bg-r text-white">
                    Suspend Student

                </Button>
            </Modal>
        </div>
    )
}


