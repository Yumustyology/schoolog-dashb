'use client'

import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb'
import Button from '@/app/components/atoms/form/Button'
import Review from '@/app/components/atoms/icons/ModalIcons/Review'
import DraftIcon from '@/app/components/atoms/icons/dashboard/DraftIcon'
import SubmitIcon from '@/app/components/atoms/icons/dashboard/SubmitIcon'
import Modal from '@/app/components/molecules/Modal'
import YNmodal from '@/app/components/molecules/YNmodal'
import AnswerBox from '@/app/components/molecules/dashboard/student/subjects/AnswerBox'
import { Inter_400, Inter_600, poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import React from 'react'

function page() {
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    const onClose = () => setIsModalOpen(false);
    return (
        <main className="">

            <BreadcrumbBox />

            <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
                <div className='border-b border-[#E5E5EA] mb-8'>
                    <h2 className={cn('text-[#101828] text-xl mb-3 ', poppins_500.className)}>The Impact of Social Media Marketing on Brand Loyalty Among Millennials</h2>
                    <p className={cn('text-sm text-[#475467] mb-4', poppins_400.className)}> Assignment instruction goes here </p>
                </div>

                <div className='flex flex-col gap-6'>
                    <AnswerBox question='List five example of ubiquitous animals' mark={10} />
                    <AnswerBox question='How can it help reduce the risk of cardiovascular diseases?' mark={5} />
                    <AnswerBox question='What are the potential health benefits of adopting a plant-based diet?' mark={20} />

                    <div className='flex gap-4'>
                        <Button round className={cn('h-[44px] text-sm text-white px-8', Inter_600.className)}> <SubmitIcon /> <span>Submit</span>  </Button>

                        <Button round className={cn('h-[44px] text-sm bg-transparent text-[#EB5757] border border-[#EB5757] px-8', Inter_600.className)}> <DraftIcon /> <span> Draft </span>  </Button>
                    </div>

                </div>

            </div>
            {isModalOpen && (<YNmodal isOpen={true} onClose={onClose} title='Submit assignment' body='Are you sure you want to submit this answer? You will be graded based on the answer provided'></YNmodal>)}

            {isModalOpen && (
                <Modal isOpen={true} onClose={onClose} title="Submit assignment">
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-8">
                            <Review />
                        </div>
                        <h3 className={cn('text-lg', Inter_600.className)}>
                            {' '}
                            Assignment submitted{' '}
                        </h3>
                        <p
                            className={cn(
                                'text-center text-gray3 mt-4 px-3',
                                Inter_400.className
                            )}
                        >
                            You have successfully submitted your assignment
                        </p>
                    </div>

                    <Button wide round className="h-12 mt-7">
                        Okay
                    </Button>
                </Modal>
            )}

        </main>
    )
}

export default page