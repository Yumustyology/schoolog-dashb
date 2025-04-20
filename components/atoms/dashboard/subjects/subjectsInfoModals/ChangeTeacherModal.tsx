import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { changeAssignedTeacherModal, closeChangeTeacherModal } from '@/app/lib/entities/subject.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import DropdownSearch from '@/components/atoms/form/DropdownSearch';
import ImageOptionBox from '@/components/atoms/form/ImageOptionBox';
import Modal from '@/components/molecules/Modal'
import React from 'react'
import { useEntity } from 'simpler-state';

const options = [
    { value: "Abdulateef Kayode", label: <ImageOptionBox name='Abdulateef Kayode' role='Matematics' /> },
    { value: "Mahmud Yussuf", label: <ImageOptionBox name='Mahmud Yussuf' /> },
    { value: "oke Aderonke", label: <ImageOptionBox name='Joke Aderonke' role='English' /> }
];

function ChangeTeacherModal() {
    const isOpen = useEntity(changeAssignedTeacherModal)
    const [selectedOption, setSelectedOption] = React.useState('');
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeChangeTeacherModal}
            title="Change Teacher "
        >
            <div>
                <div>
                    <p className={cn('text-base text-gray1 text-center w-2/3 mx-auto', Inter_500.className)}>
                        Select the new teacher you want to assign to this subject
                    </p>
                </div>

                <div>
                    <div className="mt-10">
                        <div className="max-w-sm mx-auto">
                            <p className={cn('text-base text-gray1 mb-2', poppins_400.className)}>Teacher name</p>
                            <DropdownSearch options={options} value={selectedOption} onChange={setSelectedOption} placeholder="Input name" />
                        </div>
                    </div>
                </div>


            </div>
            <Button wide round className="h-12 mt-7" onClick={closeChangeTeacherModal}>
                Submit
            </Button>
        </Modal>

    )
}

export default ChangeTeacherModal