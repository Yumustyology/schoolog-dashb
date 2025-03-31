import React from 'react';
import Modal from '../../Modal';
import Button from '@/components/atoms/form/Button';
import {
  closeFeeCategoryModal,
  closePayForStudentModal,
  payForStudentOpenState,
} from '@/app/lib/entities/payment.entity';
import { useEntity } from 'simpler-state';
import Input from '@/components/atoms/form/Input';
import NoticeMarquee from '@/components/atoms/form/NoticeMarquee';
import SelectComp from '@/components/atoms/form/Select';

const PayForStudentModal: React.FC = () => {
  const payForStudentOpen = useEntity(payForStudentOpenState);

  return (
    <div>
      <Modal
        isOpen={payForStudentOpen}
        onClose={closePayForStudentModal}
        title="Pay for student"
      >
        <NoticeMarquee noticeText="Note that you will be responsible for this student payment if any issue arise." />

        <div className="grid gap-8 mt-4">
          <Input label="Student name" placeholder="Student name" />

          <SelectComp
            value=""
            triggerClasses="w-full h-[50px]"
            onValueChange={console.log}
            placeholder="Category type"
            label="Category type"
            options={[
              {
                id: 'tuition',
                name: 'Tuition',
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-6 mt-8">
          <Button
            onClick={closeFeeCategoryModal}
            wide
            round
            className="h-12 mt-7 rounded-full"
          >
            Pay for student
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PayForStudentModal;
