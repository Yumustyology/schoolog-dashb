'use client'
import { poppins_400 } from '@/app/lib/config/font.config';
import { closeStudentFilterModal, selectedFilterType, setSelecedFilterType, studentFilterModal } from '@/app/lib/entities/student.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Modal from '@/components/molecules/Modal'
import React from 'react'
import { useEntity } from 'simpler-state';
import { Dropdown } from '../../form/Dropdown';
import { StudentFilterSlider } from './StudentFilterSlider';
export const FilterModal = () => {
    const isOpen = useEntity(studentFilterModal)
    const [selectedOption, setSelectedOption] = React.useState('');

    const options = [
        { value: "all", label: 'All' },
        { value: "grade", label: 'By grade' },
        { value: "attendance", label: 'By Attendance' },
    ];

    const selectedFilter = useEntity(selectedFilterType);
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeStudentFilterModal}
            title="Filter "
        >
            <div>
                <div className="max-w-sm mx-auto">
                    <p className={cn('text-base text-gray1 mb-2', poppins_400.className)}>Arrangement</p>
                    <Dropdown options={options} selectedOption={selectedFilter} onChange={setSelecedFilterType} placeholder="All" />
                </div>
                {
                    selectedFilter === 'all' &&
                    <div>
                        <StudentFilterSlider filtertype='Attendance' />
                        <StudentFilterSlider filtertype='Grade' />
                    </div>
                }
                {
                    selectedFilter === 'attendance' &&
                    <div>
                        <StudentFilterSlider filtertype='Attendance' />
                    </div>
                }
                {
                    selectedFilter === 'grade' &&
                    <div>
                        <StudentFilterSlider filtertype='Grade' />
                    </div>
                }

            </div>
            <Button wide round className="h-12 mt-8" onClick={closeStudentFilterModal}>
                Apply filter
            </Button>
        </Modal>
    )
}



