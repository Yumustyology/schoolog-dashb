import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import Button from '@/components/atoms/form/Button'
import Input from '@/components/atoms/form/Input'
import { AdditionIcon, Upload_Icon2 } from '@/components/atoms/icons/Icons'
import Modal from '@/components/molecules/Modal'
import React from 'react'
import { AddedResource } from '../AddedResource'

export const UploadResourcesModal = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: () => void }) => {
    return (

        <Modal
            isOpen={isOpen}
            onClose={setIsOpen}
            title="Upload resources "
        >
            <div className='max-h-80 overflow-y-scroll px-2'>
                <div className="">
                    <Input
                        id="resource"
                        label="Resource Name"
                        type="text"
                        labelClassName="label"
                        className="input h-14 rounded-lg"
                        name="email"
                        placeholder="Input resource name"
                    // value={loginInfo.password}
                    // handleChange={updateLoginInfo}
                    />

                    <div className="mx-auto mb-4 mt-4 text-center bg-primary bg-opacity-5 border border-primary rounded-xl border-opacity-15 w-full py-7 px-10">
                        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary bg-opacity-5  border border-primary border-opacity-15  mx-auto mb-3">
                            <Upload_Icon2 />
                        </div>
                        <p className={cn('text-sm text-primary', poppins_400.className)}>
                            {' '}
                            Upload file{' '}
                        </p>
                        <p className={cn('mt-2 text-gray', poppins_400.className)}>
                            This upload supports <br /> .csv format
                        </p>
                    </div>

                    <Button round wide className="bg-gray7 h-12 flex items-center mb-6">
                        <AdditionIcon color='#828282' />
                        <span className={cn('text-base text-gray3', poppins_500.className)}>
                            Add new resource
                        </span>
                    </Button>

                    <div className='mt-8 '>
                        <h3 className={cn('text-base text-gray mb-6', poppins_500.className)}>Add Resources</h3>
                        <div className='flex flex-col gap-3'>
                            <AddedResource />
                            <AddedResource />
                        </div>
                    </div>
                </div>
            </div>
            <Button wide round className="h-12 mt-7" onClick={setIsOpen}>
                Upload resources
            </Button>
        </Modal>

    )
}
