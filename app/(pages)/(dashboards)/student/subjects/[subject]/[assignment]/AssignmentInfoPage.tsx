'use client';

import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import Review from '@/components/atoms/icons/ModalIcons/Review';
import DraftIcon from '@/components/atoms/icons/dashboard/DraftIcon';
import SubmitIcon from '@/components/atoms/icons/dashboard/SubmitIcon';
import Modal from '@/components/molecules/Modal';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { OrangeCheckBadgeIcon } from '@/components/atoms/icons/Icons';
import AnswerBox from '@/components/molecules/dashboard/student/subjects/AnswerBox';
import {
  Inter_400,
  Inter_600,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';

function AssignmentInfoPage() {
  const [assignmentSubmittedModalOpen, setAssignmentSubmittedModalOpen] =
    React.useState(false);
  const [confirmSubmitAssignmentModal, setConfirmSubmitAssignmentModal] =
    React.useState(false);

  return (
    <main className="">
      <BreadcrumbBox
        crumbs={[
          {
            isActive: false,
            label: 'Subjects',
            href: '/student/subjects',
          },
          {
            isActive: false,
            label: 'Biology',
            href: '/student/subjects/biology',
          },
          {
            isActive: true,
            label: 'Assignment',
          },
        ]}
      />

      <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
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
            Assignment instruction goes here
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <AnswerBox
            question="List five example of ubiquitous animals"
            mark={10}
          />
          <AnswerBox
            question="How can it help reduce the risk of cardiovascular diseases?"
            mark={5}
            answerType="select"
            // multipleChoice
          />
          <AnswerBox
            question="What are the potential health benefits of adopting a plant-based diet?"
            mark={20}
          />

          <AnswerBox
            questionType="images"
            question={['']}
            mark={20}
            answerType="upload"
          />

          <div className="flex gap-4">
            <Button
              round
              onClick={() => setConfirmSubmitAssignmentModal(true)}
              className={cn(
                'h-[44px] text-sm text-white px-8',
                Inter_600.className
              )}
            >
              <SubmitIcon /> <span>Submit</span>
            </Button>

            <Button
              round
              className={cn(
                'h-[44px] text-sm bg-transparent text-[#EB5757] border border-[#EB5757] px-8',
                Inter_600.className
              )}
            >
              <DraftIcon /> <span> Draft </span>
            </Button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmSubmitAssignmentModal}
        close={() => setConfirmSubmitAssignmentModal(false)}
        title="Submit assignment"
        onConfirm={() => {
          setConfirmSubmitAssignmentModal(false);
          setAssignmentSubmittedModalOpen(true);
        }}
        body="Are you sure you want to submit this answer? You will be graded based on the answer provided"
        icon={<OrangeCheckBadgeIcon />}
        confirmText="Submit"
        cancelClassName="bg-transparent border text-primary border-primary"
      />

      <Modal
        isOpen={assignmentSubmittedModalOpen}
        onClose={() => setAssignmentSubmittedModalOpen(false)}
        title="Submit assignment"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8">
            <Review />
          </div>
          <h3 className={cn('text-lg', Inter_600.className)}>
            {' '}
            Assignment submitted{' '}
          </h3>
          <p
            className={cn(
              'text-center text-gray3 mt-4 px-3',
              Inter_400.className
            )}
          >
            You have successfully submitted your assignment
          </p>
        </div>

        <Button wide round className="h-12 mt-7">
          Okay
        </Button>
      </Modal>
    </main>
  );
}

export default AssignmentInfoPage;
