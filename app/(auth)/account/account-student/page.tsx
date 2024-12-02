'use client'
import { Button } from '@/app/components/atoms/Button'
import Review from '@/app/components/atoms/icons/ModalIcons/Review'
import Modal from '@/app/components/molecules/Modal'
import AccountName from '@/app/components/molecules/auth/AccountName'
import Input from '@/app/components/molecules/auth/Input'

import { Inter_400, Inter_600, poppins_400, poppins_600 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import React from 'react'


function page() {
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    const onClose = () => setIsModalOpen(false);


    return (
        <div className=' max:w-full flex flex-col items-center justify-center min-h-screen py-28 tablet:px-14 laptop:px-28 mx-auto px-8'>
            <div className='mb-9'>
                <h1 className={cn('text-[#101828] mb-2 text-3xl leading-10', poppins_600.className)} >
                    Input your  <span className='text-primary'> student ID </span>  to access your profile
                </h1>
                <p className={cn('text-[#828282] text-base mt-4', poppins_400.className)}>
                    Lorem ipsum dolor sit amet consectetur. Blandit nibh convallis et imperdiet lobortis et. Egestas vitae bibendum morbi.
                </p>
            </div>


            <div className='flex flex-col gap-4 w-full'>
                <div className='mb-10'>

                    <AccountName />
                </div>
                <Input
                    label='Student ID'
                    placeholder='Input your student ID'
                />

            </div>

            {isModalOpen &&

                <Modal isOpen={true} onClose={onClose} title='Review'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='mb-10'>
                            <Review />
                        </div>
                        <h3 className={cn('text-lg', Inter_600.className)}> ID Verified </h3>
                        <p className={cn('text-center text-gray3 mt-4', Inter_400.className)}> Your ID has been verified successfully! proceed to you dashboard to view your details </p>

                    </div>
                    <div className='mt-12'>
                        <Button name='Proceed to dashboard ' />
                    </div>
                </Modal>
            }


        </div>
    )
}

export default page