'use client';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/atoms/form/Button';
import { IoAdd } from 'react-icons/io5';
import { CardFooter } from '@material-tailwind/react';
import { DrawerSide } from '../DrawerSide';
import { CloseIcon, EditIcon } from '@/components/atoms/icons/Icons';
import {
  openDeleteFeeCategoryModal,
  openFeeCategoryModal,
} from '@/app/lib/entities/paymentCategory.entity';

const feeCategory = [
  {
    title: 'Grade 1 fee',
    amount: '$100',
    description: 'JSS1,JSS2,JSS3',
  },
  {
    title: 'Grade 2 fee',
    amount: '$100',
    description: 'SS1,SS2,SS3',
  },
  {
    title: 'Grade 3 fee',
    description: 'JSS1,JSS2,JSS3',
    amount: '$100',
  },
  {
    title: 'Grade 4 fee',
    description: 'JSS1,JSS2,JSS3',
    amount: '$100',
  },
  {
    title: 'Grade 5 fee',
    description: 'JSS1,JSS2,JSS3',
    amount: '$100',
  },
  {
    title: 'Grade 6 fee',
    description: 'JSS1,JSS2,JSS3',
    amount: '$100',
  },
  {
    title: 'Grade 7 fee',
    amount: '$100',
    description: 'JSS1,JSS2,JSS3',
  },
];

const PaymentFeeBox = ({
  title,
  amount,
  description,
}: {
  title: string;
  amount: string;
  description: string;
}) => (
  <div className="w-full border p-4 border-gray4 bg-[#FCFCFC] rounded-lg mb-4 last:mb-0 grid grid-cols-[1fr_auto] items-center">
    <div>
      <p
        className={cn(
          'text-sm font-semibold text-[#001F3F] mb-1',
          poppins_500.className
        )}
      >
        {title}
      </p>
      <p className={cn('text-gray6 text-xs', poppins_400.className)}>
        {description}
      </p>
    </div>
    <div className="text-right">
      <p
        className={cn(
          'text-sm font-semibold text-[#001F3F]',
          poppins_600.className
        )}
      >
        {amount}
      </p>
      <p className={cn('text-xs text-[#BDBDBD]', poppins_400.className)}>
        Amount
      </p>
    </div>
  </div>
);

type PaymentCategoriesProps = React.ComponentProps<typeof Card> & {
  subTitle: string;
  onClickAddButton?: () => void;
};

const PaymentCategory = ({
  className,
  title,
  subTitle,
  onClickAddButton,
  ...props
}: PaymentCategoriesProps) => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <>
      <Card
        className={cn(
          'w-full bg-white border-none rounded-lg min-h-[478px]',
          className
        )}
        {...props}
      >
        <CardHeader>
          <CardTitle
            className={cn(
              'text-base flex w-full justify-between',
              poppins_600.className
            )}
          >
            <div>
              <h2>{title}</h2>
              <p className={cn('text-sm text-gray3', poppins_400.className)}>
                {subTitle}
              </p>
            </div>
            <Button
              onClick={() => {
                closeDrawer();
                if (onClickAddButton) {
                  onClickAddButton();
                }
              }}
              round
              className={cn(
                'rounded-full text-primary min-w-[134px] bg-light text-sm font-normal',
                poppins_400.className
              )}
            >
              <IoAdd color={'#21B55A'} size={20} /> &nbsp; Add category
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 mt-0 max-h-[320px] overflow-auto sidebar-scroll">
          <div>
            {feeCategory.map((notification, index) => (
              <PaymentFeeBox
                amount={notification.amount}
                description={notification.description}
                title={notification.title}
                key={index}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={openDrawer}
            className="h-[40px] w-full bg-[#F8F8F8] rounded-full text-gray6"
            wide
          >
            See all
          </Button>
        </CardFooter>
      </Card>

      <DrawerSide
        open={open}
        close={closeDrawer}
        title="School fees categories"
        subtitle="Click on any category to view details, edit or delete"
        headerClassName="bg-transparent text-black border border-b-gray5"
        cancelClassName="bg-[#F2F2F2]"
        subTitleClassName="text-gray3"
        className=""
      >
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="mt-0 max-h-[70dvh]">
            {feeCategory.map((notification, index) => (
              <div
                className="flex gap-2 flex-grow w-full items-center justify-between"
                key={index}
              >
                <PaymentFeeBox
                  amount={notification.amount}
                  description={notification.description}
                  title={notification.title}
                />
                <div className="flex -mt-4 gap-2">
                  <Button
                    className="bg-gray10 bg-opacity-10 rounded-full p-1.5"
                    onClick={() => {
                      closeDrawer();
                      openFeeCategoryModal();
                    }}
                  >
                    <EditIcon color="#001F3F" size={18} />
                  </Button>

                  <Button
                    className="bg-[#EB57570F] bg-opacity-5 rounded-full p-1.5"
                    onClick={() => {
                      closeDrawer();
                      openDeleteFeeCategoryModal();
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 mt-6">
          <Button
            onClick={() => {
              closeDrawer();
              if (onClickAddButton) {
                onClickAddButton();
              }
            }}
            round
            wide
            className="absolute bottom-3 bg-primary left-0 right-0 w-full text-white flex gap-3"
          >
            <IoAdd color={'#FFFFFF'} size={20} /> &nbsp;Add new category
          </Button>
        </div>
      </DrawerSide>
    </>
  );
};

export default PaymentCategory;
