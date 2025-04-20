import Button from '@/components/atoms/form/Button'
import { ClassDropdownList } from '@/components/atoms/form/ClassDropdownList'
import Input from '@/components/atoms/form/Input'
import Modal from '@/components/molecules/Modal'
import React from 'react'

export const AddBookModal = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={()=>{setIsOpen(false)}}
            title="Add Book"
        >
            <div className=''>
                <form action="" method="post" className='flex flex-col gap-7'>
                    <Input
                        id="bookName"
                        label="Book name"
                        type="text"
                        labelClassName="label text-gray2 mb-0"
                        className=" h-11 rounded-lg"
                        name="text"
                        placeholder="Input book name"
                    />

                    <div className='flex flex-row-reverse gap-6 items-center'>
                        <div className='flex-1'>

                            <Input
                                id="totalNumber"
                                label="Total number"
                                type="text"
                                labelClassName="label text-gray2 mb-0"
                                className=" h-11 rounded-lg"
                                name="text"
                                placeholder="Input number"

                            />
                        </div>
                        <div className='flex-1'>
                            <ClassDropdownList />

                        </div>


                    </div>
                </form>

            </div>
            <Button wide round className="h-12 mt-7">
                Add book
            </Button>
        </Modal>
    )
}
