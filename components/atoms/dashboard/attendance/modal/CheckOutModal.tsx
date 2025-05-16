'use client';
import Button from '@/components/atoms/form/Button';
import DropdownMultiSelect, {
  OptionType,
} from '@/components/atoms/form/DropdownMultiSelect';
import Modal from '@/components/molecules/Modal';
import React from 'react';
import { MultiValue } from 'react-select';
import { useEntity } from 'simpler-state';
import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
import {
  checkOutModal,
  closeCheckOutModal,
  selectedCheckOutType,
  setSelectedCheckOutType,
} from '@/app/lib/entities/attendance.entity';
import { TeacherCheck } from '../TeacherCheck';
import { StudentCheck } from '../StudentCheck';
export const CheckOutModal = () => {
  const isOpen = useEntity(checkOutModal);

  const options = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
  ];

  const selectedCheckOut = useEntity(selectedCheckOutType);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeCheckOutModal} title="Check out">
        <div>
          <RadioOptionType
            options={options}
            selectedOption={selectedCheckOut}
            setSelectedOption={setSelectedCheckOutType}
          />

          {selectedCheckOut === 'teacher' ? (
            <div className="mt-8">
              <TeacherCheck />
            </div>
          ) : (
            <div>
              <StudentCheck />
            </div>
          )}
        </div>
        <Button wide round className="h-12 mt-8" onClick={closeCheckOutModal}>
          Check in
        </Button>
      </Modal>
    </div>
  );
};
