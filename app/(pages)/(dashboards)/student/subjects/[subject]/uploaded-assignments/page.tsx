'use client';

import { uploadedAssignment } from '@/app/assets';
import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/app/components/atoms/form/Button';
import Review from '@/app/components/atoms/icons/ModalIcons/Review';
import DraftIcon from '@/app/components/atoms/icons/dashboard/DraftIcon';
import SubmitIcon from '@/app/components/atoms/icons/dashboard/SubmitIcon';
import { ImageViewModal } from '@/app/components/molecules/ImageViewModal';
import Modal from '@/app/components/molecules/Modal';
import YNmodal from '@/app/components/molecules/YNmodal';
import AnswerBox from '@/app/components/molecules/dashboard/student/subjects/AnswerBox';
import { UploadAnswer } from '@/app/components/molecules/dashboard/student/subjects/UploadAnswer';
import {
  Inter_400,
  Inter_600,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function page() {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const onClose = () => setIsModalOpen(false);
  return (
    <main className="">
      <BreadcrumbBox crumbs={[
        {isActive: true,label: 'foo'}
      ]} />

      <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[826px] h-auto relative">
        <div className="border-b border-[#E5E5EA] mb-8">
          <h2
            className={cn('text-black1 text-xl mb-3 ', poppins_500.className)}
          >
            The Impact of Social Media Marketing on Brand Loyalty Among
            Millennials
          </h2>
          <p
            className={cn('text-sm text-[#475467] mb-4', poppins_400.className)}
          >
            {' '}
            Assignment instruction goes here{' '}
          </p>
        </div>

        <div className="flex flex-col gap-6 ">
          {/* <div className='flex gap-4'>
            <Image src={uploadedAssignment} alt='Assignment' />
            <Image src={uploadedAssignment} alt='Assignment' />
          </div> */}
          <ImageViewModal />

          <div className="mt-[49px]">
            <h2
              className={cn(
                'text-black1 text-[18px] mb-2',
                poppins_500.className
              )}
            >
              {' '}
              Your answers{' '}
            </h2>
            <p
              className={cn('text-[#475467] text-sm  ', poppins_400.className)}
            >
              {' '}
              Click the button below to upload assignment{' '}
            </p>

            <div>
              <UploadAnswer />
            </div>
          </div>
        </div>
        <div className="flex gap-4 absolute bottom-4 ">
          <Button
            round
            className={cn(
              'h-[44px] text-sm text-white px-8',
              Inter_600.className
            )}
          >
            {' '}
            <SubmitIcon /> <span>Submit</span>{' '}
          </Button>

          <Button
            round
            className={cn(
              'h-[44px] text-sm bg-transparent text-[#EB5757] border border-[#EB5757] px-8',
              Inter_600.className
            )}
          >
            {' '}
            <DraftIcon /> <span> Draft </span>{' '}
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <YNmodal
        submit={()=>console.log('ff')}
          isOpen={true}
          onClose={onClose}
          title="Submit assignment"
          body="Are you sure you want to submit this answer? You will be graded based on the answer provided"
        ></YNmodal>
      )}
    </main>
  );
}

export default page;
