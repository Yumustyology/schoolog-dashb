'use client';
import { Inter_500, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { AddBookModal } from '@/components/atoms/dashboard/library/modals/AddBookModal';
import { GiveOutBookModal } from '@/components/atoms/dashboard/library/modals/GiveOutBookModal';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { ClockIcon } from '@/components/atoms/icons/Icon2';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import AvailbelBooksTableList, {
  refreshLibraryBooks,
} from '@/components/molecules/dashboard/library/AvailableBookTableList';
import BorrowedBooksTableList, {
  refreshLibraryBorrows,
} from '@/components/molecules/dashboard/library/BorrowedBooksTableList';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import React from 'react';

const LibraryPage = () => {
  const breadcrumbs = [{ label: 'Library', isActive: true }];

  const todayClassesTabs = [
    {
      label: 'Available books',
      value: 'availableBooks',
      content: <AvailbelBooksTableList />,
    },
    {
      label: 'Borrowed books',
      value: 'borrowedBooks',
      content: <BorrowedBooksTableList />,
    },
  ];

  const [activeBooksTab, setActiveBooksTab] = React.useState('availableBooks');
  const [openAddBookModal, setOpenAddBookModal] = React.useState(false);
  const [openGiveOutBookModal, setOpenGiveOutBookModal] = React.useState(false);

  const handleBooksTabClick = (tabValue: string) => {
    setActiveBooksTab(tabValue);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('tab', tabValue);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${urlParams}`
    );
  };
  return (
    <main>
      <div className="flex justify-between items-center">
        <div className="">
          <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
        </div>

        <div className="flex gap-4">
          <Button
            flat
            round
            className="h-[44px]  py-3 px-6 flex gap-2 border border-primary"
            onClick={() => {
              setOpenGiveOutBookModal(true);
            }}
          >
            {' '}
            <ClockIcon />
            <span className={cn('text-base ', Inter_500.className)}>
              Give out book
            </span>
          </Button>

          <div className="relative">
            <Button
              round
              className="h-[44px]  py-3 px-6 flex gap-2"
              onClick={() => setOpenAddBookModal(true)}
            >
              {' '}
              <AdditionIcon />
              <span className={cn('text-base ', Inter_500.className)}>
                Add new book{' '}
              </span>
            </Button>
          </div>
          <AddBookModal
            isOpen={openAddBookModal}
            setIsOpen={setOpenAddBookModal}
            onAdded={refreshLibraryBooks}
          />
          <GiveOutBookModal
            isOpen={openGiveOutBookModal}
            setIsOpen={setOpenGiveOutBookModal}
            onGivenOut={() => {
              refreshLibraryBooks();
              refreshLibraryBorrows();
            }}
          />
        </div>
      </div>

      <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
        <Tabs value={activeBooksTab}>
          <div className="flex justify-end items-center">
            <TabsHeader
              className="transition-all text-sm px-2 py-2 mb-6 w-[434px] bg-[#F1F1F1] h-[53px] rounded-full"
              indicatorProps={{
                className: 'bg-transparent rounded-full shadow-none',
              }}
            >
              {todayClassesTabs.map(({ label, value }) => (
                <Tab
                  onClick={() => handleBooksTabClick(value)}
                  className={cn('text-sm text-center', poppins_500.className)}
                  activeClassName="rounded-full text-white bg-primary"
                  key={value}
                  value={value}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </div>

          <TabsBody className="w-full p-0">
            {todayClassesTabs.map(({ value, content }) => (
              <TabPanel key={value} value={value} className="p-0">
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </main>
  );
};

export default LibraryPage;
