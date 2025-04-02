import React from 'react'
import DropdownSearch from '../../form/DropdownSearch'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import ImageOptionBox from '../../form/ImageOptionBox'
import { AddedTeacherList } from '../subjects/AddedTeacherList'

export const SelectedStudents = () => {
    const [selectedOption, setSelectedOption] = React.useState('');

    const options = [
        { value: "Abdulateef Kayode", label: <ImageOptionBox name='Abdulateef Kayode' role='Matematics' /> },
        { value: "Mahmud Yussuf", label: <ImageOptionBox name='Mahmud Yussuf' /> },
        { value: "oke Aderonke", label: <ImageOptionBox name='Joke Aderonke' role='English' /> }
    ];
    return (
        <div>
            <div>
                <div className="mt-10">
                    <div className="max-w-sm mx-auto">
                        <p className={cn('text-base text-gray1 mb-2', poppins_400.className)}>Select Students</p>
                        <DropdownSearch options={options} value={selectedOption} onChange={setSelectedOption} placeholder="Input name" />
                    </div>
                </div>
            </div>


            <div className='mt-8 '>
                <h3 className={cn('text-base text-gray mb-6', poppins_500.className)}>Students </h3>
                <div className='flex flex-col gap-3'>
                    <AddedTeacherList />
                </div>
            </div>

        </div >
    )
}
