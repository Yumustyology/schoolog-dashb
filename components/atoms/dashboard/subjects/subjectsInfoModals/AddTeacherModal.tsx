import {
  Inter_500,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import {
  addTeacherModal,
  changeAssignedTeacherModal,
  closeAddTeacherModal,
  closeChangeTeacherModal,
} from '@/app/lib/entities/subject.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import DropdownSearch from '@/components/atoms/form/DropdownSearch';
import ImageOptionBox from '@/components/atoms/form/ImageOptionBox';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import Modal from '@/components/molecules/Modal';
import React from 'react';
import { useEntity } from 'simpler-state';
import { AddedTeacherList } from '../AddedTeacherList';

const options = [
  {
    value: 'Abdulateef Kayode',
    label: <ImageOptionBox name="Abdulateef Kayode" role="Matematics" />,
  },
  { value: 'Mahmud Yussuf', label: <ImageOptionBox name="Mahmud Yussuf" /> },
  {
    value: 'oke Aderonke',
    label: <ImageOptionBox name="Joke Aderonke" role="English" />,
  },
];

function AddTeacherModal() {
  const isOpen = useEntity(addTeacherModal);
  const [selectedOption, setSelectedOption] = React.useState('');
  return (
    <Modal isOpen={isOpen} onClose={closeAddTeacherModal} title="Add Teacher ">
      <div className="max-h-80 overflow-y-scroll px-2">
        <div>
          <p
            className={cn(
              'text-base text-gray1 text-center w-2/3 mx-auto',
              Inter_500.className
            )}
          >
            Select the teacher you want to add to this subject
          </p>
        </div>

        <div>
          <div className="mt-10">
            <div className="max-w-sm mx-auto">
              <p
                className={cn(
                  'text-base text-gray1 mb-2',
                  poppins_400.className
                )}
              >
                Teacher name
              </p>
              <DropdownSearch
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Input name"
              />
            </div>
          </div>
        </div>

        <Button round wide className="bg-gray7 h-12 flex items-center my-6">
          <AdditionIcon color="#828282" />
          <span className={cn('text-base text-gray3', poppins_500.className)}>
            Add new teacher
          </span>
        </Button>

        <div className="mt-8 ">
          <h3 className={cn('text-base text-gray mb-6', poppins_500.className)}>
            Teachers{' '}
          </h3>
          <div className="flex flex-col gap-3">
            <AddedTeacherList />
          </div>
        </div>
      </div>
      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={closeChangeTeacherModal}
      >
        Submit
      </Button>
    </Modal>
  );
}

export default AddTeacherModal;
