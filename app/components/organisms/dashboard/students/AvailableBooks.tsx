import BookList from '@/app/components/molecules/dashboard/library/BookList';
import React from 'react';
import {
  Inter_400,
  Inter_500,
  Inter_600,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import FormModal from '@/app/components/molecules/dashboard/FormModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Modal from '@/app/components/molecules/Modal';
import Button from '@/app/components/atoms/form/Button';
import LibraryIcon from '@/app/components/atoms/icons/dashboard/LibraryIcon';

function AvailableBooks() {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const onClose = () => setIsModalOpen(false);
  return (
    <div className="w-full">
      <BookList />

      {/* {isModalOpen && <FormModal isOpen={true} onClose={onClose} title='Borrow book' >
                <div>
                    <div>
                        <h2 className={cn('text-2xl text-gray1 ', Inter_600.className)}>
                            Book collection <span className='text-primary'>  policy </span>
                        </h2>
                        <p className={cn('text-sm text-gray mt-1', Inter_400.className)}>Fill the form below to collect book form the library</p>
                    </div>


                    <div className='mt-10'>
                        <p className={cn('text-[16px] text-gray1 mb-2', poppins_400.className)}>How long would you keep this book for?</p>
                        <Select>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select duration?" className='text-gray ' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2days">2 days</SelectItem>
                                <SelectItem value="3days">3 days</SelectItem>
                                <SelectItem value="5days">5 days</SelectItem>
                                <SelectItem value="1week">1 week</SelectItem>
                                <SelectItem value="2weeks">2 weeks</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='bg-[#21B55A0F] my-8'>
                        <p className={cn('text-sm text-primary p-3', Inter_500.className)}>Note that the longest time you keep this book for is 2 weeks according to the management protocol</p>
                    </div>

                    <div className='p-3'>
                        <h3 className={cn('text-sm text-gray1 mb-3 ', poppins_600.className)}>Declaration</h3>
                        <div className="flex items-center space-x-2 mb-6">
                            <Checkbox id="terms1" />
                            <Label
                                htmlFor="terms1"
                                className={cn('text-sm text-gray1  peer-disabled:cursor-not-allowed peer-disabled:opacity-70', poppins_400.className)}
                            >
                                I agree to return this book before or on the duration selected
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms2" />
                            <Label
                                htmlFor="terms2"
                                className={cn('text-sm text-gray1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70', poppins_400.className)}
                            >
                                I agree to pay damage fine if anything happens to this book
                            </Label>
                        </div>
                    </div>

                </div>
            </FormModal>} */}

      {isModalOpen && (
        <Modal isOpen={true} onClose={onClose} title="Request">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8">
              <LibraryIcon />
            </div>
            <h3 className={cn('text-lg', Inter_600.className)}>
              Book requested!
            </h3>
            <p
              className={cn(
                'text-center text-gray3 mt-4 px-3',
                Inter_400.className
              )}
            >
              Proceed to Liberian to get the essential mathematics book
            </p>
          </div>

          <Button wide round className="h-12 mt-7">
            Okay
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default AvailableBooks;
