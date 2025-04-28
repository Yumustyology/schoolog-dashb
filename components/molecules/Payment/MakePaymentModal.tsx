import React, { useState } from 'react';
import {
  closeMakePaymentModal,
  makePaymentOpenState,
} from '@/app/lib/entities/payment.entity';
import { useEntity } from 'simpler-state';
import Modal from '../Modal';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Button from '@/components/atoms/form/Button';
import MasterCardIcon from '@/components/atoms/icons/MasterCardIcon';
import VisaIcon from '@/components/atoms/icons/VisaIcon';
import { IoIosAdd } from 'react-icons/io';
import { cn } from '@/app/lib/utils';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';

const cards = [
  { id: 1, name: 'Mastercard', last4: '1211', type: 'Mastercard' },
  { id: 2, name: 'Visa', last4: '1211', type: 'Visa' },
];

const MakePaymentModal: React.FC = () => {
  const makePaymentModalOpen = useEntity(makePaymentOpenState);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div>
      <Modal
        isOpen={makePaymentModalOpen}
        onClose={closeMakePaymentModal}
        title="Make payment"
      >
        <div className="grid gap-4 mt-4">
          <RadioGroup
            value={selectedCard}
            onChange={setSelectedCard}
            className="space-y-4"
          >
            {cards.map((card) => (
              <RadioGroup.Option
                key={card.id}
                value={card}
                className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-[#F8F8F8] p-4 text-black transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-gray-400 data-[checked]:bg-gray-100"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {card.name === 'Mastercard' ? (
                        <MasterCardIcon />
                      ) : (
                        <VisaIcon />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          Inter_500.className
                        )}
                      >
                        {card.name}
                      </span>
                      <span
                        className={cn(
                          'text-sm font-normal text-[#323232]',
                          poppins_400.className
                        )}
                      >
                        **** **** **** {card.last4}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className={`h-7 w-7 text-gray-400 transition group-data-[checked]:hidden`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>

                    <CheckCircleIcon className="h-6. w-6 fill-green-500 hidden transition group-data-[checked]:block" />
                  </div>
                </div>
              </RadioGroup.Option>
            ))}

            <RadioGroup.Option
              value="new"
              className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-[#F8F8F8] p-4 text-black transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-gray-400 data-[checked]:bg-gray-100"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl bg-gray7 h-10 w-10 border border-gray1 flex items-center justify-center rounded-full">
                    <IoIosAdd />
                  </div>
                  <span
                    className={cn('text-sm font-medium', Inter_500.className)}
                  >
                    Use new card
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className={`h-7 w-7 text-gray-400 transition group-data-[checked]:hidden`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>

                  <CheckCircleIcon className="h-6. w-6 fill-green-500 hidden transition group-data-[checked]:block" />
                </div>
              </div>
            </RadioGroup.Option>
          </RadioGroup>

          <Button
            className="w-full py-3 rounded-full mt-8"
            disabled={!selectedCard}
          >
            Proceed
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MakePaymentModal;
