import React, { useState } from 'react';
import Modal from '../../Modal';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import {
  activateFeeCategoryOpenState,
  closeActivateFeeCategoryModal,
} from '@/app/lib/entities/paymentCategory.entity';
import { useEntity } from 'simpler-state';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import SelectComp from '@/components/atoms/form/Select';
import GearmarkCircle from '@/components/atoms/icons/dashboard/GearmarkCircke';

const ActivatePaymentModal = () => {
  const activateFeeCategoryOpen = useEntity(activateFeeCategoryOpenState);
  const [activatePaymentNow, setActivatePaymentNow] = useState(false);
  const [activationSuccessful, setActivateSuccessfulState] = useState(false);
  // will work for both salary and fee
  return (
    <div>
      <Modal
        isOpen={activateFeeCategoryOpen}
        onClose={() => {
          closeActivateFeeCategoryModal();
          setActivateSuccessfulState(false);
        }}
        title="Activate payment"
      >
        <div className="w-full">
          {!activationSuccessful ? (
            <>
              <div className="flex w-full flex-col items-center gap-8 justify-center">
                <SelectComp
                  selectClasses="w-full"
                  label="Payment category"
                  value=""
                  onValueChange={console.log}
                  options={[
                    {
                      id: 'Grade 1',
                      name: 'Grade 1',
                    },
                    {
                      id: 'Grade 2',
                      name: 'Grade 2',
                    },
                  ]}
                />
                <div className="w-full">
                  <label
                    className={cn(
                      'block text-left w-full text-base mb-2 text-gray6',
                      poppins_400.className
                    )}
                  >
                    Starts on
                  </label>
                  <DatePicker className="rounded-lg h-[60px] w-full text-base flex-row-reverse justify-between" />
                </div>
              </div>
              <div
                className={cn(
                  'mt-6 flex items-center space-x-2 text-sm',
                  poppins_400.className
                )}
              >
                <Checkbox
                  className="accent-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                  id="terms2"
                  checked={activatePaymentNow}
                  onCheckedChange={(checked) =>
                    setActivatePaymentNow(Boolean(checked))
                  }
                />
                <label
                  htmlFor="terms2"
                  className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Activate payment now
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full m-auto flex items-center justify-center mb-4">
                <GearmarkCircle />
              </div>

              <main className="flex flex-col items-center justify-center text-center px-6">
                {/* Add modal content here */}
                <h3
                  className={cn(
                    'text-lg mb-3 text-black1',
                    poppins_600.className
                  )}
                >
                  Payment activated
                </h3>
                <p
                  className={cn(
                    'text-base text-gray9 text-center px-[30px]',
                    poppins_400.className
                  )}
                >
                  You have successfully activated payments for students
                </p>
              </main>
            </>
          )}
        </div>

        <div className="gap-6 mt-10">
          <Button
            onClick={() => {
              if (!activationSuccessful) {
                setActivateSuccessfulState(true);
              } else {
                closeActivateFeeCategoryModal();
                setActivateSuccessfulState(false);
              }
            }}
            wide
            round
            className="h-12 mt-7 rounded-full"
          >
            {!activationSuccessful ? 'Activate payment' : 'Okay'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ActivatePaymentModal;
