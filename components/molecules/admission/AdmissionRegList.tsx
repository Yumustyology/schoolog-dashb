'use client';

// import Button from '@/components/atoms/form/Button';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
// import { OptionIcon } from '@/components/atoms/icons/Icons';
import EyeClose from '@/components/atoms/icons/EyeClose';
import Button from '@/components/atoms/form/Button';
import { DrawerSide } from '../dashboard/DrawerSide';
import AvaterIcon from '@/components/atoms/icons/AvaterIcon';

type TableRow = {
  applicant: string;
  class: string;
  gender: string;
  guardian: string;
  phone: string;
  appliedOn: string;
  paymentID: string;
  amount: string;
  status: 'Success' | 'Pending' | 'Failed';
};

const TABLE_ROWS: TableRow[] = [
  {
    applicant: 'Amina Bello',
    class: 'Web Design 101',
    gender: 'Female',
    guardian: 'Bello Amina',
    phone: '08012345678',
    appliedOn: '14/3/2024',
    paymentID: '#1830942022',
    amount: '64,000',
    status: 'Success',
  },
  {
    applicant: 'John Doe',
    class: 'AI 102',
    gender: 'Male',
    guardian: 'Jane Doe',
    phone: '08098765432',
    appliedOn: '15/3/2024',
    paymentID: '#1838342023',
    amount: '45,500',
    status: 'Pending',
  },
  {
    applicant: 'Amina Bello',
    class: 'Web Design 101',
    gender: 'Female',
    guardian: 'Bello Amina',
    phone: '08012345678',
    appliedOn: '14/3/2024',
    paymentID: '#1838942042',
    amount: '64,000',
    status: 'Success',
  },
  {
    applicant: 'John Doe',
    class: 'AI 102',
    gender: 'Male',
    guardian: 'Jane Doe',
    phone: '08098765432',
    appliedOn: '15/3/2024',
    paymentID: '#1838942027',
    amount: '45,500',
    status: 'Pending',
  },
];

export function AdmissionRegList(): JSX.Element {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  // const [popoverOpenIndex, setPopoverOpenIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(TABLE_ROWS.map((row) => row.paymentID)));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (paymentID: string) => {
    const updatedSelectedRows = new Set(selectedRows);
    if (updatedSelectedRows.has(paymentID)) {
      updatedSelectedRows.delete(paymentID);
    } else {
      updatedSelectedRows.add(paymentID);
    }

    setSelectedRows(updatedSelectedRows);

    if (updatedSelectedRows.size === TABLE_ROWS.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  // const togglePopover = (index: number) => {
  //   setPopoverOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  // };

  const TABLE_HEAD: string[] = [
    '',
    'Applicant',
    'Class',
    'Gender',
    'Guardian',
    'Phone',
    'Applied on',
    '',
  ];

  return (
    <>
      <Card className="shadow-none h-full w-full overflow-y-visible --overflow-x-auto">
        <table className="min-w-[800px] h-full w-full table-auto text-left">
          <thead>
            <tr>
              <th className="bg-[#FBFBFB] py-4 pl-3">
                <Checkbox
                  className="accent-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                  id="terms2"
                  checked={selectAll}
                  onCheckedChange={() => handleSelectAll()}
                />
              </th>
              {TABLE_HEAD.slice(1).map((head) => (
                <th key={head} className="bg-[#FBFBFB] p-4">
                  <Typography
                    variant="small"
                    className={cn(
                      'font-normal text-gray1',
                      poppins_400.className
                    )}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  paymentID,
                  applicant,
                  class: applicantClass,
                  gender,
                  guardian,
                  phone,
                  appliedOn,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = cn(
                  isLast ? 'p-4' : 'p-4 border-b border-gray4 relative'
                );

                const isSelected = selectedRows.has(paymentID);
                // const isPopoverOpen = popoverOpenIndex === index;

                return (
                  <tr
                    key={paymentID}
                    className={isSelected ? 'bg-[#21B55A14]' : ''}
                  >
                    <td className={'pl-3'}>
                      <Checkbox
                        className="accent-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                        id="terms2"
                        checked={isSelected}
                        onCheckedChange={() => handleSelectRow(paymentID)}
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className={cn(poppins_400.className)}
                      >
                        {applicant}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className={cn(
                          'font-normal text-gray1',
                          poppins_400.className
                        )}
                      >
                        {applicantClass}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className={cn(
                          'font-normal text-gray1',
                          poppins_400.className
                        )}
                      >
                        {gender}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className={cn(
                          'font-normal text-gray1',
                          poppins_400.className
                        )}
                      >
                        {guardian}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className={cn(
                          'font-normal text-gray1',
                          poppins_400.className
                        )}
                      >
                        {phone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className={cn(
                          'font-normal text-gray1',
                          poppins_400.className
                        )}
                      >
                        {appliedOn}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal text-gray1',
                        poppins_400.className
                      )}
                    >
                      {status}
                    </Typography>
                  </td> */}
                    {/* <td className={classes}>
                    <div onClick={() => togglePopover(index)}>
                      <OptionIcon />
                    </div>
                    {isPopoverOpen && (
                      <OptionsAdmissionDropdown
                        setIsOpen={() => setPopoverOpenIndex(null)}
                        isOpen={isPopoverOpen}
                      />
                    )}
                  </td> */}
                    <td className={classes}>
                      <Button
                        onClick={openDrawer}
                        className={cn(
                          'bg-gray7 text-gray6 flex gap-3 text-sm rounded-full',
                          poppins_400.className
                        )}
                      >
                        <EyeClose />
                        <span>View</span>
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>

      <DrawerSide
        open={open}
        close={closeDrawer}
        title="Applicant Details"
        subtitle="Reg Number: SLG-1234"
        footer={
          <div className="flex items-center gap-5">
            <Button
              round
              flat
              outlined
              wide
              className={cn(
                'w-full rounded-full flex gap-3',
                poppins_400.className
              )}
            >
              <span>Download file </span>{' '}
            </Button>
            <Button
              round
              outlined
              wide
              className={cn(
                'w-full rounded-full flex gap-3',
                poppins_400.className
              )}
            >
              <span>Admit applicant </span>{' '}
            </Button>
          </div>
        }
      >
        <>
          <div className="p-6 overflow-y-auto max-h-[90dvh] pb-10">
            <div className="mt-6--">
              <div className="flex mb-9 gap-4 items-center">
                <div className="">
                  {/* <Image alt='applicant-image' src={teacherImg} height={48} width={48} /> */}
                  <AvaterIcon />
                </div>
                <div>
                  <h2
                    className={cn(
                      poppins_500.className,
                      'text-base text-black1 font-medium'
                    )}
                  >
                    Muhammad Jamiu
                  </h2>
                  <p
                    className={cn(
                      poppins_500.className,
                      'text-sm mt-1.5 text-gray3 font-medium'
                    )}
                  >
                    SS1
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className={cn(poppins_500.className, 'text-black1 text-sm')}
                  >
                    Male
                  </h2>
                  <p
                    className={cn(poppins_400.className, 'text-gray3 text-sm')}
                  >
                    Gender
                  </p>
                </div>
                <div>
                  <h2
                    className={cn(poppins_500.className, 'text-black1 text-sm')}
                  >
                    20
                  </h2>
                  <p
                    className={cn(poppins_400.className, 'text-gray3 text-sm')}
                  >
                    Age
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className={cn(poppins_500.className, 'text-black1 text-sm')}
                  >
                    Muhammad
                  </h2>
                  <p
                    className={cn(poppins_400.className, 'text-gray3 text-sm')}
                  >
                    Guardian
                  </p>
                </div>
                <div>
                  <h2
                    className={cn(poppins_500.className, 'text-black1 text-sm')}
                  >
                    07053578760
                  </h2>
                  <p
                    className={cn(poppins_400.className, 'text-gray3 text-sm')}
                  >
                    Phone Number
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className={cn(poppins_500.className, 'text-black1 text-sm')}
                  >
                    12/06/2024
                  </h2>
                  <p
                    className={cn(poppins_400.className, 'text-gray3 text-sm')}
                  >
                    Date
                  </p>
                </div>
                {/* <div>
                  <h2
                    className={cn(poppins_500.className, 'text-black1 text-sm')}
                  >
                    07053578760
                  </h2>
                  <p
                    className={cn(poppins_400.className, 'text-gray3 text-sm')}
                  >
                    Phone Number
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </>
      </DrawerSide>
    </>
  );
}

// import React, { useRef, useEffect } from 'react';
// import { useClickAway } from 'react-use';
// import { VIsibilityIcon } from '@/components/atoms/icons/Icons';
// import Button from '@/components/atoms/form/Button';
// import EyeClose from '@/components/atoms/icons/EyeClose';

// export function OptionsAdmissionDropdown({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: () => void;
// }) {
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [dropdownPosition, setDropdownPosition] = useState({
//     top: 'auto',
//     bottom: '100%',
//   });

//   useClickAway(dropdownRef, () => setIsOpen());

//   useEffect(() => {
//     if (dropdownRef.current) {
//       const rect = dropdownRef.current.getBoundingClientRect();
//       const spaceAbove = rect.top;
//       const spaceBelow = window.innerHeight - rect.bottom;

//       if (spaceBelow < rect.height && spaceAbove >= rect.height) {
//         setDropdownPosition({ top: 'auto', bottom: '100%' });
//       } else {
//         setDropdownPosition({ top: '100%', bottom: 'auto' });
//       }
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={dropdownRef}
//       className="absolute flex flex-col gap-3 right-0 -mt-4 min-w-[173px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 p-4"
//       style={{ top: dropdownPosition.top, bottom: dropdownPosition.bottom }}
//       role="menu"
//     >
//       <button
//         className={cn(
//           'flex items-center gap-4 text-sm text-black1',
//           Inter_500.className
//         )}
//         role="menuitem"
//       >
//         <VIsibilityIcon />
//         View Profile
//       </button>

//       <button
//         className={cn(
//           'flex items-center gap-4 text-sm text-black1',
//           Inter_500.className
//         )}
//         role="menuitem"
//       >
//         {/* <Message /> */}
//         Message parent
//       </button>

//       <button
//         className={cn(
//           'flex items-center gap-4 text-sm text-black1',
//           Inter_500.className
//         )}
//         role="menuitem"
//       >
//         {/* <Message /> */}
//         Message student
//       </button>
//     </div>
//   );
// }
