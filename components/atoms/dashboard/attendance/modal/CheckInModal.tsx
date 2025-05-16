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
  checkInModal,
  closeCheckInModal,
  selectedCheckInType,
  setSelectedCheckInType,
} from '@/app/lib/entities/attendance.entity';
import { SelectedStudents } from '../../students/SelectedStudents';
import { TeacherCheck } from '../TeacherCheck';
import { StudentCheck } from '../StudentCheck';
export const CheckInModal = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<
    MultiValue<OptionType>
  >([]);
  const isOpen = useEntity(checkInModal);

  const options = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
  ];

  const selectedCheckIn = useEntity(selectedCheckInType);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeCheckInModal} title="Check in">
        <div>
          <RadioOptionType
            options={options}
            selectedOption={selectedCheckIn}
            setSelectedOption={setSelectedCheckInType}
          />

          {selectedCheckIn === 'teacher' ? (
            <div className="mt-8">
              <TeacherCheck />
            </div>
          ) : (
            <div>
              <StudentCheck />
            </div>
          )}
        </div>
        <Button wide round className="h-12 mt-8" onClick={closeCheckInModal}>
          Check in
        </Button>
      </Modal>
    </div>
  );
};
