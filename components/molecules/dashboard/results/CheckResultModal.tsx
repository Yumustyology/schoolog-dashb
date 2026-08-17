import { Inter_400, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Input from '@/components/atoms/form/Input';
import FormModal from '../FormModal';

interface CheckResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckResultModal = ({ isOpen, onClose }: CheckResultModalProps) => {
  return (
    <FormModal isOpen={isOpen} onClose={onClose} title="Check result">
      <div>
        <div>
          <h2 className={cn('text-2xl text-gray1 ', Inter_600.className)}>
            Input <span className="text-primary"> result code </span>
          </h2>
          <p className={cn('text-sm text-gray mt-1', Inter_400.className)}>
            Input the 5 unique code issued to your parents after purchasing
            the report card pass
          </p>
        </div>

        <div className="mt-10">
          <Input
            label="Report card code"
            labelClassName="-mb-3"
            placeholder="Input code"
            className="h-[56px] mt-6 border border-gray2 rounded-md"
          />
        </div>
      </div>
    </FormModal>
  );
};
