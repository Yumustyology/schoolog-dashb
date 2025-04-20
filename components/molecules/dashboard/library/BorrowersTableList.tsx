'use client'
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Empty from '@/components/molecules/empty/Empty';
import { EditIcon, NoBooksIcon, ViewProfileEyeIcon } from '@/components/atoms/icons/Icons';

import Image from 'next/image';
import { mathTextbook, teacherImg } from '@/app/assets';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';

function BorrowersTableList() {
    type BooksListType = {
        bookImage: string;
        bookName: string;
        studentImage: string;
        studnetName: string;
        borrowedDate: string;
        dueDate: string;
        fine: number
        status: 'Pending' | 'Due';
    }[];

    const borrowersList: BooksListType = [
        {
            bookImage: '',
            bookName: 'General Mathematics',
            studentImage: '',
            studnetName: 'Jamiu Muhammad',
            borrowedDate: '2/3/2025',
            dueDate: '3/4/2025',
            fine: 4,
            status: 'Pending',
        },
        {
            bookImage: '',
            bookName: 'General Mathematics',
            studentImage: '',
            studnetName: 'Jamiu Muhammad',
            borrowedDate: '2/3/2025',
            dueDate: '3/4/2025',
            fine: 4,
            status: 'Pending',
        },

    ];

    const menuItems = [
        { label: "View details", onClick: () => console.log("Profile clicked"), icon: <ViewProfileEyeIcon /> },
        { label: "Edit details", onClick: () => console.log("Settings clicked"), icon: <EditIcon size='24' /> },

    ]


    return (
        <div className="my-8 ">
            {borrowersList.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 py-12">
                    <Empty icon={<NoBooksIcon />} title='No bporrowed book yet' description='You have not yet uploaded any book. Click the button below to upload a book' buttonText='+ Add Book' />
                </div>
            ) : (
                <Table className="border-none bg-white">
                    <TableHeader className={cn('bg-[#FBFBFB] border-none text-gray text-sm', Inter_500.className)}>
                        <TableRow className="border-none text-gray3 text-sm">
                            <TableHead>Book</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Borrowed date </TableHead>
                            <TableHead>Due date</TableHead>
                            <TableHead>Fine</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {borrowersList.map((book) => (
                            <TableRow key={book.bookName} className={cn('border-b border-gray4 text-gray1 text-base items-center', Inter_400.className)}>
                                <TableCell>
                                    <div className="flex gap-2 items-center text-sm">
                                        <Image src={mathTextbook} alt=''width={40} height={40} />
                                        {book.bookName}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center text-sm">
                                        <Image src={teacherImg} alt='' />
                                        {book.studnetName}
                                    </div>
                                </TableCell>
                                <TableCell> {book.borrowedDate}</TableCell>
                                <TableCell>{book.dueDate}</TableCell>
                                <TableCell>${book.fine}</TableCell>
                                <TableCell>
                                    <div className={cn(
                                        'font-normal rounded-full py-2 px-2 text-sm text-center',
                                        book.status === 'Pending'
                                            ? 'text-[#EB5757] bg-[#EB575714]'
                                            : 'text-[#F2994A] bg-[#F2994A14]'
                                    )}>
                                        {book.status}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <MenuLists label="Options" items={menuItems} placement="bottom-start" maxHeight="150px" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
            }
        </div >
    );
}

export default BorrowersTableList;


