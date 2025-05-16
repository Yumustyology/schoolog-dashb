import { Inter_400, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Review from '@/components/atoms/icons/ModalIcons/Review';
import Modal from '@/components/molecules/Modal';
import React from 'react';

type SuccessModalProps = {
  title: string;
  icon?: React.ReactNode;
  message: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
};

export const SuccessModal = ({
  title,
  icon,
  message,
  content,
  isOpen,
  onClose,
}: SuccessModalProps) => {
  if (!isOpen) return null;
  return (
    <Modal onClose={onClose} title="Submit assignment">
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
  );
};
