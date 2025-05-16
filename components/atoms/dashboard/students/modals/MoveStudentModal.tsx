'use client';
import { poppins_400 } from '@/app/lib/config/font.config';
import {
  closeMoveModal,
  graduateModal,
  moveModal,
  selectedGraduateType,
  selectedMoveType,
  setSelectedGraduateType,
  setSelectedMoveType,
} from '@/app/lib/entities/student.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import DropdownMultiSelect, {
  OptionType,
} from '@/components/atoms/form/DropdownMultiSelect';
import Modal from '@/components/molecules/Modal';
import { Label } from '@/components/ui/label';
import React from 'react';
import { MultiValue } from 'react-select';
import { useEntity } from 'simpler-state';
import { SelectedStudents } from '../SelectedStudents';
import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
export const MoveStudentModal = () => {
  const classes = [
    { value: 'jss1', label: 'JSS1' },
    { value: 'jss2', label: 'JSS2' },
    { value: 'jss3', label: 'JSS3' },
    { value: 'ss1', label: 'SS1' },
    { value: 'ss2', label: 'SS2' },
    { value: 'ss3', label: 'SS3 ' },
  ];
  const [selectClass, setSelectClass] = React.useState<MultiValue<OptionType>>(
    []
  );
  const isOpen = useEntity(moveModal);

  const options = [
    { value: 'promotion', label: 'Promotion' },
    { value: 'demotion', label: 'Demotion' },
  ];

  const selectedMove = useEntity(selectedMoveType);

  const handleMove = () => {
    closeMoveModal;
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeMoveModal} title="Move">
        <div>
          <RadioOptionType
            options={options}
            selectedOption={selectedMove}
            setSelectedOption={setSelectedMoveType}
          />

          <div className="mt-8">
            <Label
              className={cn('text-base text-gray1 mb-2', poppins_400.className)}
            >
              Select Class
            </Label>

            <DropdownMultiSelect
              options={classes}
              value={selectClass}
              onChange={setSelectClass}
              placeholder="Select classes..."
            />
          </div>
        </div>
        <Button
          wide
          round
          className="h-12 mt-8"
          onClick={() => {
            handleMove;
          }}
        >
          {selectedMove === 'promotion' ? 'Promotion' : 'Demote'}
        </Button>
      </Modal>
    </div>
  );
};
