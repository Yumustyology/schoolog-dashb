import {
  Inter_500,
  poppins_500,
  poppins_700,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { BookStatusDropdown } from '@/components/atoms/dashboard/library/BookStatusDropdown';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import SearchInput from '@/components/atoms/form/SearchInput';
import { EditIcon } from '@/components/atoms/icons/Icons';
import { BookInfoPageHeader } from '@/components/molecules/dashboard/library/BookInfoPageHeader';
import BorrowersTableList from '@/components/molecules/dashboard/library/BorrowersTableList';
import Link from 'next/link';
import React from 'react';

export const BookInfoPage = ({ book }: { book: string }) => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <BreadcrumbBox
          className="mb-0"
          crumbs={[
            {
              label: 'Library',
              isActive: false,
              href: '/school/library',
            },
            {
              label: 'Mathematics',
              isActive: true,
            },
          ]}
        />

        <div className=" flex gap-4">
          <Link href="/school/parents/edit-parent-info">
            <Button round className="h-[48px]  py-3 px-8 flex gap-2">
              {' '}
              <EditIcon color="#FFFFFF" />
              <span className={cn('text-base ', Inter_500.className)}>
                {' '}
                Edit Details
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <main className="">
        <BookInfoPageHeader bookId={book} />
        <div className="bg-white p-6">
          <div className="flex justify-between items-center">
            <h2 className={cn('text-base text-black1', poppins_700.className)}>
              {' '}
              Borrowers list
            </h2>
            <div className="flex gap-6 ">
              <SearchInput
                placeholder="Search student..."
                className="w-[231px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
              />

              <BookStatusDropdown type="available" />
            </div>
          </div>

          <BorrowersTableList />
        </div>
      </main>
    </div>
  );
};

export default BookInfoPage;
