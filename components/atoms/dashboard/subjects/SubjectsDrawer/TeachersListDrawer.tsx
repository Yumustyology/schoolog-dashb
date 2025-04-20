import { teacherImg, teacherImg2 } from '@/app/assets'
import { Inter_500, Inter_600 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import NotificationBigIcon from '@/components/atoms/icons/ModalIcons/NotificationBigIcon'
import { DrawerSide } from '@/components/molecules/dashboard/DrawerSide'
import React from 'react'
import { AssignedTeacherDetail } from '../AssignedTeacherDetail'
import Button from '@/components/atoms/form/Button'

const teacherLists = [
    {
        name: 'Jamui Muhammmad',
        img: teacherImg,
        subjectAssignedTo: 'mathematics'
    },
    {
        name: 'Jamui Yussuf',
        img: teacherImg2,
        subjectAssignedTo: 'mathematics'
    },
    {
        name: 'Cross James',
        img: teacherImg2,
        subjectAssignedTo: 'mathematics'
    },
]


export const TeachersListDrawer = ({ isTeacherListOpen, setIsTeacherListOpen }: { isTeacherListOpen: boolean, setIsTeacherListOpen: any }) => {
    return (
        <DrawerSide
            open={isTeacherListOpen}
            close={() => setIsTeacherListOpen(false)}
            title="4 assigned teachers"
            className="w-[472px]"
        >
            <div className="p-6 overflow-y-auto sidebar-scroll max-h-[calc(100vh-140px)]">
                {teacherLists.length > 0 ? (
                    <div className="">
                        {teacherLists.map((teacher, index) => (
                            <AssignedTeacherDetail
                                key={index}
                                img={teacher.img}
                                name={teacher.name}
                                subjectAssignedTo={teacher.subjectAssignedTo}
                                setIsTeacherListOpen={setIsTeacherListOpen}
                            />

                        ))}
                        <Button wide round className='bg-light text-primary py-3 mt-14'> Add teacher </Button>
                    </div>
                ) : (
                    <div className="flex w-full h-[25rem]">
                        <div className="flex flex-col justify-center items-center text-center mx-auto h-full my-auto">
                            <NotificationBigIcon />
                            <h1
                                className={cn(
                                    'mt-8 mb-3 text-xl text-gray1',
                                    Inter_600.className
                                )}
                            >
                                No Teacher Assigned Yet
                            </h1>
                            <p className={cn('text-sm text-gray', Inter_500.className)}>
                                Add a new teacher here
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </DrawerSide>
    )
}
