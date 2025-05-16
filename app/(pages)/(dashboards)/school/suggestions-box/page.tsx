'use client';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import SuggestionIcon from '@/components/atoms/icons/dashboard/SuggestionIcon';
import Modal from '@/components/molecules/Modal';
import {
  Inter_400,
  Inter_600,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import SuggestionBox from '@/components/atoms/dashboard/suggestions/SuggestionBox';
import SearchInput from '@/components/atoms/form/SearchInput';
import { ClassDropdown } from '@/components/atoms/dashboard/students/ClassDropdown';
import { SuggestionCategoryDropdown } from '@/components/atoms/dashboard/suggestions/SuggestionCategoryDropdown';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import Empty from '@/components/molecules/empty/Empty';
import {
  NoParentAddedIcon,
  NoSuggestionIcon,
} from '@/components/atoms/icons/Icons';

export type SuggestionType = {
  id: number;
  title: string;
  content: string;
  category?: 'Parents' | 'Teachers' | 'Students';
  date?: string;
};

const suggestions: SuggestionType[] = [
  {
    id: 1,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
    category: 'Parents',
    date: '2/4/2025',
  },
  {
    id: 2,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
    category: 'Parents',
    date: '2/4/2025',
  },
  {
    id: 3,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
    category: 'Students',
    date: '2/4/2025',
  },
  {
    id: 4,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
    category: 'Parents',
    date: '2/4/2025',
  },
  {
    id: 4,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
    category: 'Parents',
    date: '2/4/2025',
  },
];

function Page() {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <BreadcrumbBox
          className=""
          crumbs={[
            {
              isActive: true,
              label: 'Suggestions',
            },
          ]}
        />
      </div>

      <div className="bg-white p-4 min-h-[100vh]">
        <div className="flex gap-6">
          <SearchInput
            placeholder="Search title or keyword"
            className="w-[245px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
          />

          <SuggestionCategoryDropdown />
          <DatePicker className="w-54" />
        </div>

        <div className="h-full">
          {suggestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 py-12">
              <Empty
                icon={<NoSuggestionIcon />}
                title="No suggestion yet"
                description="You have not yet received any suggestion. suggestion made by students, parents nd teachers will be seen here "
              />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 mt-4">
              {suggestions.map((suggestion, index) => {
                return (
                  <SuggestionBox
                    key={suggestion.id}
                    suggestion={suggestion}
                    type="Admin"
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8">
            <SuggestionIcon />
          </div>
          <h3 className={cn('text-lg', Inter_600.className)}>
            Suggestion sent!
          </h3>
          <p
            className={cn(
              'text-center text-gray3 mt-4 px-3',
              Inter_400.className
            )}
          >
            You have successfully submit your oppinion in suggestion box
          </p>
        </div>

        <Button wide round className="h-12 mt-7">
          Okay
        </Button>
      </Modal>
    </div>
  );
}

export default Page;
