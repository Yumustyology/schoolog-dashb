'use client';
import React from 'react';
import useSWR from 'swr';
import {
  fetchGuardians,
  type GuardianWard,
} from '@/app/lib/actions/guardian.actions';

const isGuardianWardObject = (ward: GuardianWard | string): ward is GuardianWard =>
  typeof ward !== 'string';
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
import { NoParentAddedIcon, ViewProfileEyeIcon, AdditionIcon } from '../../icons/Icons';
import Button from '@/components/atoms/form/Button';
import { openAddStudentsMenu } from '@/app/lib/entities/student.entity';
import { AddStudentMenu } from '@/components/atoms/dashboard/students/modals/AddStudentMenu';
import TextAvatar from '@/components/atoms/TextAvatar';
import Link from 'next/link';
import Message from '../../icons/SideBar/Message';
import Empty from '@/components/molecules/empty/Empty';
import MenuLists from '../students/MenuLists';
import ParentsTableShimmer from './shimmer/ParentsTableShimmer';


function ParentsTableLists({ search = '' }: { search?: string }) {
  const { data, isLoading } = useSWR(
    ['guardians', search],
    () => fetchGuardians({ page: 1, limit: 10, ...(search ? { search } : {}) })
  );
  const guardians = data?.data || [];

  const menuItems = [
    {
      label: 'View Profile',
      onClick: () => console.log('Profile clicked'),
      icon: <ViewProfileEyeIcon />,
    },
    {
      label: 'Message',
      onClick: () => console.log('Settings clicked'),
      icon: <Message size="24" />,
    },
  ];

  return (
    <div className="my-8 ">
      
      {isLoading ? (
        <ParentsTableShimmer />
      ) : guardians.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          {search ? (
            <Empty
              icon={<NoParentAddedIcon />}
              title="No results found"
              description={`No parents match "${search}". Try a different search term.`}
            />
          ) : (
            <Empty
              icon={<NoParentAddedIcon />}
              title="No parent added yet"
              description="You have not yet added any parent. parents details will show here once you add students"
              buttonText="+ Add parents"
            />
          )}
        </div>
      ) : (
        <Table className="border-none bg-white">
          <TableHeader
            className={cn(
              'bg-[#FBFBFB] border-none text-gray text-sm',
              Inter_500.className
            )}
          >
            <TableRow className="border-none text-gray3 text-sm">
              <TableHead>Parent Name</TableHead>
              <TableHead>Student(s)</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Phone</TableHead>
              {/* <TableHead>Payment Status</TableHead> */}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {guardians.map((guardian) => (
              <TableRow
                key={guardian._id}
                className={cn(
                  'border-b border-gray4 text-gray1 text-base items-center',
                  Inter_400.className
                )}
              >
                <TableCell>
                  {guardian.firstName} {guardian.lastName}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm">
                    {guardian.wards && guardian.wards.length > 0 ? (
                      <div className="flex flex-row -space-x-2">
                        {guardian.wards.filter(isGuardianWardObject).map((ward) => (
                          <Link
                            key={ward._id}
                            href={`/students/${ward.studentSlugId}`}
                            title={`${ward.firstName} ${ward.lastName}`}
                          >
                            <TextAvatar
                              firstName={ward.firstName}
                              lastName={ward.lastName}
                              size={32}
                              colorClass="bg-primary"
                              className="border border-white shadow cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No wards</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{guardian.relationship}</TableCell>
                <TableCell>{guardian.phoneNumber}</TableCell>
                {/* <TableCell>
                  <div className={cn('font-normal rounded-full py-2 px-2 text-sm text-center', 'text-primary bg-primary1')}>
                    Cleared
                  </div>
                </TableCell> */}
                <TableCell>
                  <MenuLists
                    label="Options"
                    items={menuItems}
                    placement="bottom-start"
                    maxHeight="150px"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default ParentsTableLists;

