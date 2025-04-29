'use client'
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import Empty from '../../empty/Empty';
import { NoParentAddedIcon, NoTeacherIcon, SuspendIcon, ViewProfileEyeIcon } from '@/components/atoms/icons/Icons';
import Message from '@/components/atoms/icons/SideBar/Message';
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon';
import { teacherImg2 } from '@/app/assets';
import Image from 'next/image';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';


function TeachersTableLists() {
    type ParentsListType = {
        name: string;
        img: string;
        assignedSujects: string;
        attendance: number;
        phoneNumber: string;
        dateJoined: string;
        status: 'Active' | 'Suspended' | 'Terminated'
    }[];

    const teachersList: ParentsListType = [
        {
            name: 'Muhammad Jamui',
            img: '',
            assignedSujects: 'Mathematics SSS1, SSS2',
            attendance: 78,
            phoneNumber: "08065095692",
            dateJoined: 'Tue 28th June',
            status: 'Active'
        },
        {
            name: 'Muhammad Jamui',
            img: '',
            assignedSujects: 'Mathematics SSS1, SSS2',
            attendance: 78,
            phoneNumber: "08065095692",
            dateJoined: 'Tue 28th June',
            status: 'Terminated'
        },
        
    ];

    const menuItems = [
        { label: "View Profile", onClick: () => console.log("Profile clicked"), icon: <ViewProfileEyeIcon /> },
        { label: "Message", onClick: () => console.log("Settings clicked"), icon: <Message size='24' /> },
        { label: "Suspend", onClick: () => console.log("More clicked"), icon: <SuspendIcon /> },
        { label: "Withdraw", onClick: () => console.log("Another clicked"), icon: <CancelIcon />, danger: true },
    ]


    return (
        <div className="my-8 ">
            {teachersList.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 py-12">
                    <Empty icon={<NoTeacherIcon />} title='No staff added yet' description='You have not yet added any staff. Cleck the button bellow tro add a staff' buttonText='+ Add staff' />
                </div>
            ) : (
                <Table className="border-none bg-white">
                    <TableHeader className={cn('bg-[#FBFBFB] border-none text-gray text-sm', poppins_400.className)}>
                        <TableRow className="border-none text-gray3 text-sm">
                            <TableHead>Name</TableHead>
                            <TableHead>Assigned subject</TableHead>
                            <TableHead>Phone number</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead>Date joined</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {teachersList.map((teacher) => (
                            <TableRow key={teacher.name} className={cn('border-b border-gray4 text-gray1 text-sm items-center', poppins_400.className)}>
                                <TableCell>
                                    <div className="flex gap-2 items-center text-sm">
                                        <Image src={teacherImg2} alt="teacher-image" width={25} height={25}/>
                                        {teacher.name}
                                    </div>
                                </TableCell>
                                <TableCell>{teacher.assignedSujects}</TableCell>

                                <TableCell>{teacher.phoneNumber}</TableCell>
                                <TableCell>{teacher.attendance}%</TableCell>
                                <TableCell>{teacher.dateJoined}</TableCell>
                                <TableCell>
                                    <div className={cn(
                                        'font-normal rounded-full py-2 px-2 text-sm text-center',
                                        teacher.status === 'Active'
                                            ? 'text-primary bg-primary1'
                                            : teacher.status === 'Suspended'
                                                ? 'text-[#F2994A] bg-[#F2994A14]'
                                                : teacher.status === 'Terminated'
                                                    ? 'text-[#EB5757] bg-[#EB575714]'
                                                    : 'text-gray-500 bg-gray-100'

                                    )}>
                                        {teacher.status}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <MenuLists label="Options" items={menuItems} placement="bottom-start" maxHeight="150px" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default TeachersTableLists;

