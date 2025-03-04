'use client';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
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

const suggestionBox = [
  {
    id: 1,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 2,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 3,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 4,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
  {
    id: 4,
    title: 'Suggestion title goes here ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Enim elementum risus consectetur non nisi dui quis. Donec nisl porttitor vulputate nam. Lacus vestibulum sagittis eu eros sit. Augue et elementum semper',
  },
];

function Page() {
  const [suggestionFormModalOpen, setSuggestionFormModalOpen] =
    React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbBox
          className="mb-0"
          crumbs={[
            {
              isActive: true,
              label: 'Suggestions',
            },
          ]}
        />
        <Button
          round
          className={cn(
            'text-white text-[16px] flex gap-4 py-3 px-8 bg-primary ',
            Inter_600.className
          )}
          onClick={() => setSuggestionFormModalOpen(true)}
        >
          Make suggestion
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-4 p-4 bg-white">
        {suggestionBox.map((suggestionBox, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-3 w-full border bg-[#fcfcfc] border-gray4 p-3.5 rounded-md"
            >
              <h4 className={cn('text-black text-sm', poppins_500.className)}>
                {suggestionBox.title}{' '}
              </h4>
              <p className={cn('text-gray1 text-xs', poppins_400.className)}>
                {suggestionBox.content}{' '}
              </p>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={suggestionFormModalOpen}
        onClose={() => setSuggestionFormModalOpen(false)}
        title="Make suggestions "
      >
        <div>
          <div>
            <h2 className={cn('text-2xl text-gray1 ', Inter_600.className)}>
              Make your <span className="text-primary"> suggestion </span>
            </h2>
            <p className={cn('text-sm text-gray mt-1', Inter_400.className)}>
              Let school management know what you will like see in existence
            </p>
          </div>

          <div>
            <div className="mt-10">
              <Input
                label="Suggestion title"
                labelClassName="-mb-3"
                placeholder="Input title"
                className="h-[50px] mt-6 border border-gray2 rounded-md text-[16px] text-gray1"
              />
            </div>
          </div>

          <div>
            <div className="mt-10">
              <Input
                label="Description"
                labelClassName="-mb-3"
                placeholder="Explain your suggestion here "
                className="h-[120px] mt-6 border border-gray2 rounded-md"
              />
            </div>
          </div>
        </div>
        <Button wide round className="h-12 mt-7">
          Submit
        </Button>
      </Modal>

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
