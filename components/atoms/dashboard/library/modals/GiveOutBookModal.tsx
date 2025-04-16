import Button from '@/components/atoms/form/Button'
import { DurationDropdown } from '@/components/atoms/form/DurationDropdown'
import Input from '@/components/atoms/form/Input'
import Modal from '@/components/molecules/Modal'
import React from 'react'

export const GiveOutBookModal = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={()=>{setIsOpen(false)}}
            title="Give out book"
        >
            <div className=''>
                <form action="" method="post" className='flex flex-col gap-4'>
                    <Input
                        id="studentNam"
                        label="Student name"
                        type="text"
                        labelClassName="label text-gray2 mb-0"
                        className=" h-11 rounded-lg"
                        name="text"
                        placeholder="Input student name"
                    />

                   
                   
                            <DurationDropdown/>

                   
                </form>

            </div>
            <Button wide round className="h-12 mt-7">
                Add book
            </Button>
        </Modal>
    )
}
