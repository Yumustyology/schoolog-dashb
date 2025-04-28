'use client'
import { biology1 } from '@/app/assets'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import SubjectModal from '@/components/atoms/dashboard/subjects/subjectsInfoModals/SubjectModal'
import Button from '@/components/atoms/form/Button'
import { ArchiveIcon, ArchiveModalIcon, DeleteIcon, DeleteModalIcon, UnachiveModalIcon, UnarchiveIcon } from '@/components/atoms/icons/Icons'
import Image from 'next/image'
import React, { useState } from 'react'

export const BookInfoPageHeader = () => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [archiveModal, setArchiveModal] = useState(false)
    const [unarchiveModal, setUnarchiveModal] = useState(false)
    return (
        <div className='bg-white p-6 my-8 rounded-2xl flex justify-between'>
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Image src={biology1} alt="Subject Image" />
                    <div>
                        <h1 className={cn('text-sm text-black1', poppins_500.className)}>
                            General Mathematics
                        </h1>
                        <p className={cn('text-sm text-gray', poppins_400.className)}>
                            SS1
                        </p>
                    </div>
                </div>

                <div className='flex gap-8'>
                    <BookDetailsTemplate text='Total upload' value='32' />
                    <BookDetailsTemplate text='Total borrowed' value='12' />
                    <BookDetailsTemplate text='Total left' value='8' />
                    <BookDetailsTemplate text='Total due' value='6' />
                </div>
            </div>

            <div className=' flex flex-col justify-between'>
                <p className={cn('text-primary ml-auto rounded-full w-fit bg-light py-1.5 px-3')}>Available</p>

                <div className="flex gap-5 justify-between">
                    <Button
                        round
                        flat
                        className={cn(
                            'flex  text-r2 h-[48px] w-[191px] border border-r2'
                        )}
                        onClick={() => { setDeleteModal(true) }}
                    >
                        <DeleteIcon />
                        <span className="text-r2">Delete Subject</span>
                    </Button>

                    {
                        false
                            ? (
                                <Button
                                    round
                                    className={cn('flex  text-primary h-[48px] w-[191px] bg-light')}
                                    onClick={() => { setUnarchiveModal(true) }}
                                >
                                    <UnarchiveIcon color='#21B55A' />
                                    <span className="text-primary">Post book </span>
                                </Button>
                            )
                            : (
                                <Button
                                    round
                                    className={cn('flex  text-primary h-[48px] w-[191px] bg-light')}
                                    onClick={() => { setArchiveModal(true) }}
                                >
                                    <ArchiveIcon color='#21B55A' />
                                    <span className="text-primary">Archive</span>
                                </Button>
                            )
                    }
                </div>
            </div>
            <SubjectModal type='delete' title="Delete book" content='Are you sure you want to delete this book? this book can’t be recovered' icon={<DeleteModalIcon />} open={deleteModal} close={() => setDeleteModal(false)} />
            <SubjectModal type='archive' title="Archive book" content='Are you sure you want to archive this book? it won’t be visible to students and teachers again' icon={<ArchiveModalIcon />} open={archiveModal} close={() => setArchiveModal(false)} />
            <SubjectModal type='unarchive' title="Post book" content='Are you sure you want to post this book? This will make it visible to students and teachers' icon={<UnachiveModalIcon />} open={unarchiveModal} close={() => setUnarchiveModal(false)} />

        </div>
    )
}


const BookDetailsTemplate = ({ text, value }: { text: string, value: string }) => {
    return (
        <div className='flex flex-col gap-1.5'>
            <p className={cn('text-sm text-black1', poppins_500.className)}>
                {value}
            </p>
            <h5 className={cn('text-sm text-gray3', poppins_400.className)}>
                {text}
            </h5>

        </div>
    )

}