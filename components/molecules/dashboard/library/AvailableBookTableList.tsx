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
import { ArchiveIcon, EditIcon, NoBooksIcon, ViewProfileEyeIcon } from '@/components/atoms/icons/Icons';

import Image from 'next/image';
import { mathTextbook } from '@/app/assets';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';

function AvailbelBooksTableList() {
    type BooksListType = {
        bookImage: string;
        bookName: string;
        class: string;
        noOfUploadedBooks: number;
        numberOfLeftBooks: number;
        numberOfBorrowedBooks: number;
        status: 'Available' | 'Out of Stock' | 'Archived';
    }[];

    const availableBooksList: BooksListType = [
        {
            bookImage: '',
            bookName: 'General Mathematics',
            class: 'SS1',
            noOfUploadedBooks: 22,
            numberOfLeftBooks: 10,
            numberOfBorrowedBooks: 12,
            status: 'Available',
        }

    ];

    const menuItems = [
        { label: "View details", onClick: () => console.log("Profile clicked"), icon: <ViewProfileEyeIcon /> },
        { label: "Edit details", onClick: () => console.log("Settings clicked"), icon: <EditIcon size='24' /> },
        { label: "Archive", onClick: () => console.log("Logout clicked"), icon: <ArchiveIcon /> },

    ]


    return (
        <div className="my-8 ">
            {availableBooksList.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 py-12">
                    <Empty icon={<NoBooksIcon />} title='No book yet' description='You have not yet uploaded any book. Click the button below to upload a book' buttonText='+ Add Book' />
                </div>
            ) : (
                <Table className="border-none bg-white">
                    <TableHeader className={cn('bg-[#FBFBFB] border-none text-gray text-sm', Inter_500.className)}>
                        <TableRow className="border-none text-gray3 text-sm">
                            <TableHead>Books</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Total uploaded</TableHead>
                            <TableHead>Total left</TableHead>
                            <TableHead>Total borrowed</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {availableBooksList.map((book) => (
                            <TableRow key={book.bookName} className={cn('border-b border-gray4 text-gray1 text-base items-center', Inter_400.className)}>
                                <TableCell>
                                    <div className="flex gap-2 items-center text-sm">
                                        <Image src={mathTextbook} alt='' width={40} height={46}/>
                                        {book.bookName}
                                    </div>
                                </TableCell>
                                <TableCell>{book.class}</TableCell>
                                <TableCell> {book.noOfUploadedBooks}</TableCell>
                                <TableCell>{book.numberOfLeftBooks}</TableCell>
                                <TableCell>{book.numberOfBorrowedBooks}</TableCell>
                                <TableCell>
                                    <div className={cn(
                                        'font-normal rounded-full py-2 px-2 text-sm text-center',
                                        book.status === 'Available'
                                            ? 'text-primary bg-primary1'
                                            : book.status === 'Out of Stock'
                                                ? 'text-[#EB5757] bg-[#EB575714]'
                                                : book.status === 'Archived'
                                                    ? 'text-[#F2994A] bg-[#F2994A14]'
                                                        : 'text-gray-600 bg-gray-200',
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
            )}
        </div>
    );
}

export default AvailbelBooksTableList;


