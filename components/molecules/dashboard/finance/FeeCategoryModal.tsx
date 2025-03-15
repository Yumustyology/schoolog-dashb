import React, { useRef, useState } from 'react';
import Modal from '../../Modal';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import {
  closeFeeCategoryModal,
  feeCategoryOpenState,
} from '@/app/lib/entities/paymentCategory.entity';
import { useEntity } from 'simpler-state';
import Input from '@/components/atoms/form/Input';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { IoAdd } from 'react-icons/io5';
import SubtotalDetail, { SubtotalDetailHandles } from './SubtotalDetail'; // ⬅️ import the component here

interface Subtotal {
  id: number;
  title: string;
  price: string;
}

const FeeCategoryModal: React.FC = () => {
  const feeCategoryOpen = useEntity(feeCategoryOpenState);
  const [latePayment, setLatePayment] = useState<boolean>(false);
  const subtotalDetailRef = useRef<SubtotalDetailHandles>(null);

  const [subtotals, setSubtotals] = useState<Subtotal[]>([]);
  const [editingId, setEditingId] = useState<number | null>(1);

  const handleAddNewSubtotal = () => {
    const currentEntrySave = handleSaveClick() as unknown as () => boolean;

    if (!currentEntrySave) return;

    const newId = subtotals.length
      ? Math.max(...subtotals.map((s) => s.id)) + 1
      : 1;

    const newSubtotal = { id: newId, title: '', price: '' };
    setSubtotals([...subtotals, newSubtotal]);
    setEditingId(newId);
  };

  const handleEditSubtotal = (updatedSubtotal: Subtotal) => {
    setSubtotals((prev) =>
      prev.map((s) => (s.id === updatedSubtotal.id ? updatedSubtotal : s))
    );
  };

  const pruneEditing = () => setEditingId(null);

  const handleRemoveSubtotal = (id: number) => {
    setSubtotals((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) setEditingId(-1);
  };

  const handleSaveClick = () => {
    if (subtotalDetailRef.current) {
      return subtotalDetailRef.current.handleSave();
    } else {
      if (subtotals.length) {
        alert('Please');
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={feeCategoryOpen}
        onClose={closeFeeCategoryModal}
        title="Fees category"
      >
        <p
          className={cn(
            'text-base text-gray1 text-center px-16',
            poppins_500.className
          )}
        >
          Input the details of the fee category you want to create
        </p>

        <div className="flex flex-col items-center gap-8 justify-center">
          <Input label="Category name" placeholder="Juniors school fees" />
          <Input label="Amount ($)" placeholder="100" />
          <Input label="Class involved" placeholder="JSS1,JSS2" />
        </div>

        <div
          className={cn(
            'mt-6 flex items-center space-x-2 text-sm',
            poppins_400.className
          )}
        >
          <Checkbox
            id="terms2"
            checked={latePayment}
            onCheckedChange={(checked: boolean) =>
              setLatePayment(Boolean(checked))
            }
            className="accent-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
          />
          <label
            htmlFor="terms2"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set late payment fine
          </label>
        </div>

        {latePayment && (
          <div className="mt-6 grid grid-cols-2 gap-6 items-center">
            <div>
              <label
                className={cn(
                  'block text-left w-full text-base mb-2 text-gray6',
                  poppins_400.className
                )}
              >
                Late payment starts on
              </label>
              <DatePicker className="rounded-lg h-[60px] w-full text-base" />
            </div>
            <Input
              label="Late payment fine (₦)"
              className="flex-shrink-0"
              placeholder="100"
            />
          </div>
        )}

        {/* Subtotals */}
        <div className="mt-6">
          {subtotals.length > 0 && (
            <h3 className="text-left text-base mb-4 text-gray6">Subtotals</h3>
          )}

          {subtotals.map((subtotal) => (
            <SubtotalDetail
              key={subtotal.id}
              ref={subtotalDetailRef}
              subtotal={subtotal}
              isEditing={editingId === subtotal.id}
              setIsEditing={() => setEditingId(subtotal.id)}
              onEdit={handleEditSubtotal}
              pruneEditing={pruneEditing}
              onRemove={handleRemoveSubtotal}
            />
          ))}

          <Button
            wide
            round
            onClick={handleAddNewSubtotal}
            className="rounded-full bg-[#F8F8F8] text-gray1 mt-6 border"
          >
            <IoAdd color={'#4F4F4F'} size={24} /> &nbsp;{' '}
            {subtotals.length > 0 ? 'Add new subtotal' : 'Add fee breakdown'}
          </Button>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <Button
            onClick={closeFeeCategoryModal}
            wide
            round
            className="h-12 mt-7 rounded-full"
          >
            Save category
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FeeCategoryModal;
