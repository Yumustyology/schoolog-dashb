import Input from '@/components/atoms/form/Input';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { Label } from '@/components/ui/label';
import DropdownMultiSelect, {
  OptionType,
} from '@/components/atoms/form/DropdownMultiSelect';
import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
import { MultiValue } from 'react-select';
import { useEntity } from 'simpler-state';
import {
  selectedAnnouncementPreference,
  setSelectedAnnoncementPreference,
} from '@/app/lib/entities/annoucement.entity';
import { AnnouncementMediumDropdown } from '@/components/atoms/dashboard/announcement/AnnoucementMediumDropdown';
import { AnnouncementStaffCategoryDropdown } from '@/components/atoms/dashboard/announcement/AnnoucementStaffCategory';

function Step2() {
  const selectedAnnouncement = useEntity(selectedAnnouncementPreference);
  const options = [
    { value: 'all', label: 'All' },
    { value: 'students', label: 'Students' },
    { value: 'staff', label: 'Staff' },
    { value: 'parents', label: 'Parents' },
  ];
  const classes = [
    { value: 'jss1', label: 'JSS1' },
    { value: 'jss2', label: 'JSS2' },
    { value: 'jss3', label: 'JSS3' },
    { value: 'ss1', label: 'SS1' },
    { value: 'ss2', label: 'SS2' },
    { value: 'ss3', label: 'SS3 ' },
  ];
  const [selectedClass, setSelectedClass] = React.useState<
    MultiValue<OptionType>
  >([]);
  return (
    <div>
      <div className="mb-12 mt-6">
        <p className={cn('text-primary text-xs', poppins_600.className)}>
          Annoucement preference
        </p>
        <h2
          className={cn(
            'text-xl --text-center text-gray1 mt-3',
            poppins_500.className
          )}
        >
          Select announcement audience and end date
        </h2>
      </div>
      <div>
        <RadioOptionType
          options={options}
          selectedOption={selectedAnnouncement}
          setSelectedOption={setSelectedAnnoncementPreference}
        />
      </div>

      <div className="mt-8">
        {selectedAnnouncement === 'students' && (
          <div>
            <Label
              className={cn('text-base text-gray1 mb-2', poppins_400.className)}
            >
              Select Class
            </Label>
            <DropdownMultiSelect
              options={classes}
              value={selectedClass}
              onChange={setSelectedClass}
              placeholder="Select classes..."
            />
          </div>
        )}

        {selectedAnnouncement === 'staff' && (
          <div className="mt-6">
            <AnnouncementStaffCategoryDropdown />
          </div>
        )}
        <div className=" mt-6">
          <AnnouncementMediumDropdown />
        </div>

        <Input
          id="expiringDate"
          label="Expires on (Optional)"
          type="date"
          labelClassName="label text-gray2 mt-6"
          className=" h-11 rounded-lg"
          name="text"
          placeholder="Select date"
          // value={loginInfo.password}
          // handleChange={updateLoginInfo}
        />
      </div>
    </div>
  );
}

export default Step2;

// 'use client'
// import { poppins_400 } from '@/app/lib/config/font.config';
// import { closeGraduateModal, graduateModal, selectedGraduateType, setSelectedGraduateType } from '@/app/lib/entities/student.entity';
// import { cn } from '@/app/lib/utils';
// import Button from '@/components/atoms/form/Button';
// import DropdownMultiSelect, { OptionType } from '@/components/atoms/form/DropdownMultiSelect';
// import Modal from '@/components/molecules/Modal'
// import { Label } from '@/components/ui/label';
// import React from 'react'
// import { MultiValue } from 'react-select';
// import { useEntity } from 'simpler-state';
// import { SelectedStudents } from '../SelectedStudents';
// import ConfirmModal from './ConfirmModal';
// import { GraduateModalIcon } from '@/components/atoms/icons/Icon2';
// import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
// import { selectedAnnouncementPreference, setSelectedAnnoncementPreference } from '@/app/lib/entities/annoucement.entity';
// export const GraduateModal = () => {
//   const [isGraduateSuccessModalOpen, setIsGraduateSuccessModalOpen] = React.useState(false)
//   const periods = [
//     { value: "jss1", label: "JSS1" },
//     { value: "jss2", label: "JSS2" },
//     { value: "jss3", label: "JSS3" },
//     { value: "ss1", label: "SS1" },
//     { value: "ss2", label: "SS2" },
//     { value: "ss3", label: "SS3 " },
//   ];
//   const [selectedPeriod, setSelectedPeriod] = React.useState<MultiValue<OptionType>>([]);
//   const isOpen = useEntity(graduateModal)

//   const selectedGraduate = useEntity(selectedGraduateType);

//   const handleConfirmGraduate = () => {
//     closeGraduateModal
//     setIsGraduateSuccessModalOpen(true)
//   }

//   return (
//     <div>
//       <Modal
//         isOpen={isOpen}
//         onClose={closeGraduateModal}
//         title="Graduate"
//       >
//         <div>

//           {selectedGraduate === 'wholeClass' ?
//             (

//               <div className='mt-8'>
//                 <Label className={cn('text-base text-gray1 mb-2', poppins_400.className)}>
//                   Select Class
//                 </Label>

//                 <DropdownMultiSelect options={periods} value={selectedPeriod} onChange={setSelectedPeriod} placeholder="Select classes..." />
//               </div>

//             )
//             : (
//               <div>
//                 <SelectedStudents />
//               </div>
//             )

//           }

//         </div>
//         <Button wide round className="h-12 mt-8" onClick={() => { handleConfirmGraduate }}>
//           Graduate
//         </Button>
//       </Modal>
//       <ConfirmModal icon={<GraduateModalIcon />} title='Graduate 100 students' content='Are you sure you want to graduate these students? these students won’t be among active students again' btnText='Graduate' open={isGraduateSuccessModalOpen} close={() => { setIsGraduateSuccessModalOpen(false) }} />
//     </div>
//   )
// }
