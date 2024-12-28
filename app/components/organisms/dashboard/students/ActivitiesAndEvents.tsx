'use client'
import Dot from '@/app/components/atoms/dashboard/subjects/Dot'
import CalendarIcon from '@/app/components/atoms/icons/dashboard/CalendarIcon'
import CategoryIcon from '@/app/components/atoms/icons/dashboard/CategoryIcon'
import Modal from '@/app/components/molecules/Modal'
import FormModal from '@/app/components/molecules/dashboard/FormModal'
import QuestionBox from '@/app/components/molecules/dashboard/QuestionBox'
import YesNoQuestion from '@/app/components/molecules/dashboard/YesNoQuestionnBox'
import { Inter_400, Inter_600, poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { activitiesAndEvents } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

function ActivitiesAndEvents() {
    const [isModalOpen, setIsModalOpen] = React.useState(true);
    const onClose = () => setIsModalOpen(false);
    return (
        <div className='w-full'>


            <section className="grid grid-cols-3 gap-6">
                {activitiesAndEvents.map((activitiesAndEvent) => {
                    return (
                        <div key={activitiesAndEvent.title} className="flex flex-col gap-4 max-w-[333px] bg-white flex-1">
                            <div className='h-[161px] relative'>
                                <Image className='w-[333px] h-[161px] object-cover rounded-[8px]' src={activitiesAndEvent.image} alt={activitiesAndEvent.title} />
                                <p className={cn('border border-[#FFFFFFA6] absolute top-3 right-3  bg-[#00000059] text-white rounded-[32px] py-1 px-2 ', poppins_500.className)}>{activitiesAndEvent.price}</p>
                            </div>
                            <div className=" flex flex-col gap-3">
                                <h2
                                    className={cn(
                                        'text-base text-gray1',
                                        poppins_500.className
                                    )}
                                >
                                    {activitiesAndEvent.title}
                                </h2>

                                <div
                                    className={cn(
                                        'flex items-center gap-2 text-gray3 text-sm',
                                        poppins_500.className
                                    )}
                                >
                                    <span className="text-gray3">
                                        {activitiesAndEvent.type}{' '}
                                    </span>
                                    <Dot />
                                    <span >
                                        {activitiesAndEvent.mode}
                                    </span>
                                </div>
                                <div
                                    className={cn(
                                        'flex items-center gap-2 text-gray6 text-xs',
                                        poppins_400.className
                                    )}
                                >

                                    <span className="flex items-center gap-1">
                                        <CalendarIcon />
                                        {activitiesAndEvent.date}{' '}
                                    </span>
                                    <span className='flex items-center gap-1'>
                                        <CategoryIcon />
                                        {activitiesAndEvent.category}
                                    </span>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
            {isModalOpen && (<FormModal isOpen={true} onClose={onClose} title='Create project' body='Are you sure you want to submit this answer? You will be graded based on the answer provided'>
                <div>

                    <h2 className={cn('text-2xl text-gray1 ', Inter_600.className)}>
                        Fill the <span className='text-primary'>  Registration form </span>
                    </h2>
                    <p className={cn('text-sm text-gray mt-1', Inter_400.className)}>Fill the registration form to proceed with your registration</p>


                </div>

                <div className='mt-[63px]'>
                    <QuestionBox />
                    <div>
                        <YesNoQuestion question='Do you have any club you presently partake in?' />
                        <Input placeholder='Input the club name' className='h-[56px] mt-6 border border-gray2 rounded-md' />
                    </div>
                    <div>
                        <YesNoQuestion question='Have you previously joined a jet club in the past' />
                        <Input placeholder='Input the club name' className='h-[56px] mt-6 border border-gray2 rounded-md' />
                    </div>

                    <div className='mt-6'>
                        <Label className={cn('text-[16px] text-gray1 mt-6', Inter_400.className)}>What name do you prefer to be called?</Label>
                        <Input placeholder='Input the text here...' className='h-[56px] mt-3 border border-gray2 rounded-md' />
                    </div>
                </div>

            </FormModal>)}

            {/* {isModalOpen && (
                <Modal isOpen={true} onClose={onClose} title="Request">
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-8">
                            <Request/>
                        </div>
                        <h3 className={cn('text-lg', Inter_600.className)}>
                            {' '}
                            Request sent{' '}
                        </h3>
                        <p
                            className={cn(
                                'text-center text-gray3 mt-4 px-3',
                                Inter_400.className
                            )}
                        >
                            You will be notified once the admin accept your request
                        </p>
                    </div>

                    <Button wide round className="h-12 mt-7">
                        Okay
                    </Button>
                </Modal>
            )} */}

        </div>
    )
}

export default ActivitiesAndEvents