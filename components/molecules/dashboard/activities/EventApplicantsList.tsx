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
import { teacherImg2 } from '@/app/assets';
import Image from 'next/image';
import { NoEventIcon } from '@/components/atoms/icons/Icons';


function EventApplicantsList() {
    type EventListType = {
        name: string;
        id: string;
        category: string;
        dateRegistered: string;
    }[];

    const applicantsList: EventListType = [
        {
            name: 'Muhammad Jamui',
            id: '172928739HD',
            category: 'Student',
            dateRegistered: '12/2/2025'
        },
        {
            name: 'Muhammad Jamui',
            id: '172928739HD',
            category: 'Student',
            dateRegistered: '12/2/2025'
        },

    ];

  

    return (
        <div className="my-8 ">
            {applicantsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 py-12">
                    <Empty icon={<NoEventIcon />} title='No applicants yet' description='You have no applicant yet ' />
                </div>
            ) : (
                <Table className="border-none bg-white">
                    <TableHeader className={cn('bg-[#FBFBFB] border-none text-gray text-sm', poppins_400.className)}>
                        <TableRow className="border-none text-gray3 text-sm">
                            <TableHead>Name</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date registered</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applicantsList.map((applicant) => (
                            <TableRow key={applicant.name} className={cn('border-b border-gray4 text-gray1 text-sm items-center', poppins_400.className)}>
                                <TableCell>
                                    <div className="flex gap-2 items-center text-sm">
                                        <Image src={teacherImg2} alt="applicant-image" width={25} height={25} />
                                        {applicant.name}
                                    </div>
                                </TableCell>
                                <TableCell>{applicant.id}</TableCell>
                                <TableCell>{applicant.category}</TableCell>

                                <TableCell>{applicant.dateRegistered}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default EventApplicantsList;

