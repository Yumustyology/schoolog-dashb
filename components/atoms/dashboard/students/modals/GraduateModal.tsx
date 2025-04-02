'use client'
import { poppins_400 } from '@/app/lib/config/font.config';
import { closeGraduateModal, graduateModal, selectedGraduateType, setSelectedGraduateType } from '@/app/lib/entities/student.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import DropdownMultiSelect, { OptionType } from '@/components/atoms/form/DropdownMultiSelect';
import Modal from '@/components/molecules/Modal'
import { Label } from '@/components/ui/label';
import React from 'react'
import { MultiValue } from 'react-select';
import { useEntity } from 'simpler-state';
import { SelectedStudents } from '../SelectedStudents';
import ConfirmModal from './ConfirmModal';
import { GraduateModalIcon } from '@/components/atoms/icons/Icon2';
import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
export const GraduateModal = () => {
    const [isGraduateSuccessModalOpen, setIsGraduateSuccessModalOpen] = React.useState(false)
    const periods = [
        { value: "jss1", label: "JSS1" },
        { value: "jss2", label: "JSS2" },
        { value: "jss3", label: "JSS3" },
        { value: "ss1", label: "SS1" },
        { value: "ss2", label: "SS2" },
        { value: "ss3", label: "SS3 " },
    ];
    const [selectedPeriod, setSelectedPeriod] = React.useState<MultiValue<OptionType>>([]);
    const isOpen = useEntity(graduateModal)

    const options = [
        { value: 'wholeClass', label: 'Whole Class' },
        { value: 'selectedClass', label: 'Selected Students' }
    ];

    const selectedGraduate = useEntity(selectedGraduateType);
    
    const handleConfirmGraduate = ()=>{
        closeGraduateModal
        setIsGraduateSuccessModalOpen(true)
    }
    
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={closeGraduateModal}
                title="Graduate"
            >
                <div>
                    <RadioOptionType options={options} selectedOption={selectedGraduate} setSelectedOption={setSelectedGraduateType} />

                    {selectedGraduate === 'wholeClass' ?
                        (

                            <div className='mt-8'>
                                <Label className={cn('text-base text-gray1 mb-2', poppins_400.className)}>
                                    Select Class
                                </Label>

                                <DropdownMultiSelect options={periods} value={selectedPeriod} onChange={setSelectedPeriod} placeholder="Select classes..." />
                            </div>

                        )
                        : (
                            <div>
                                <SelectedStudents />
                            </div>
                        )

                    }


                </div>
                <Button wide round className="h-12 mt-8" onClick={()=>{handleConfirmGraduate}}>
                    Graduate
                </Button>
            </Modal>
            <ConfirmModal icon={<GraduateModalIcon />} title='Graduate 100 students' content='Are you sure you want to graduate these students? these students won’t be among active students again' btnText='Graduate' open={isGraduateSuccessModalOpen} close={()=>{setIsGraduateSuccessModalOpen(false)}}/>
        </div>
    )
}



// interface Option {
//     label: string
//     value: string
// }

// interface RadioButtonsProps {
//     options: Option[]
//     selectedOption: string
//     setSelectedOption: (value: string) => void
// }

// const RadioButtons: React.FC<RadioButtonsProps> = ({ options, selectedOption, setSelectedOption }) => {
//     // const [selectedOption, setSelectedOption] = React.useState<string | null>(null)

//     const handleSelection = (value: string) => {
//         setSelectedOption(value)
//     }

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, value: string) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//             handleSelection(value)
//         }
//     }

//     return (
//         <div className="flex gap-4">
//             {options.map((option) => (
//                 <div
//                     key={option.value}
//                     className={cn(
//                         'flex items-center text-sm space-x-2 py-2.5 px-4 border rounded-full cursor-pointer transition-all',
//                         selectedOption === option.value ? 'bg-primary text-white' : 'bg-gray11 text-gray3',
//                         'focus:outline-primary',
//                         poppins_400.className)}
//                     tabIndex={0}
//                     onClick={() => handleSelection(option.value)}
//                     onKeyDown={(e) => handleKeyDown(e, option.value)}
//                     role="radio"
//                     aria-checked={selectedOption === option.value}
//                 >
//                     <span
//                         className={cn(
//                             'w-4 h-4 border rounded-full flex items-center justify-center',
//                             selectedOption === option.value ? 'border-white' : 'border-gray3 bg-white'
//                         )}
//                     >
//                         {selectedOption === option.value && (
//                             <span className="w-2 h-2 bg-white rounded-full"></span>
//                         )}
//                     </span>
//                     <span className="">{option.label}</span>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default RadioButtons
