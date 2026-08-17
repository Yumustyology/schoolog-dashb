import React, { useEffect, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';
import Modal from '../../Modal';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import {
  closeFeeCategoryModal,
  feeCategoryOpenState,
  selectedFeeCategoryId,
  setSelectedFeeCategoryId,
} from '@/app/lib/entities/payment.entity';
import { useEntity } from 'simpler-state';
import Input from '@/components/atoms/form/Input';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { IoAdd } from 'react-icons/io5';
import SubtotalDetail, { SubtotalDetailHandles } from './SubtotalDetail'; // ⬅️ import the component here
import type { Subtotal } from '@/app/lib/types/finance.types';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import feeCategoryActions from '@/app/lib/actions/feeCategory.action';
import showToast from '@/app/lib/utils/toast';

const FeeCategoryModal: React.FC = () => {
  const feeCategoryOpen = useEntity(feeCategoryOpenState);
  const editingFeeCategoryId = useEntity(selectedFeeCategoryId);
  const [latePayment, setLatePayment] = useState<boolean>(false);
  const subtotalDetailRef = useRef<SubtotalDetailHandles>(null);

  const [subtotals, setSubtotals] = useState<Subtotal[]>([]);
  const [editingId, setEditingId] = useState<number | null>(1);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [classGradeIds, setClassGradeIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const { data: feeCategoriesResp } = useSWR(
    ['fee-categories'],
    feeCategoryActions.fetchFeeCategories
  );

  useEffect(() => {
    if (!feeCategoryOpen) return;
    if (!editingFeeCategoryId) {
      setName('');
      setAmount('');
      setClassGradeIds([]);
      return;
    }
    const existing = feeCategoriesResp?.data?.find(
      (fc) => fc._id === editingFeeCategoryId
    );
    if (existing) {
      setName(existing.name);
      setAmount(String(existing.amount / 100));
      setClassGradeIds(
        (existing.classGradeIds || []).map((cg) =>
          typeof cg === 'string' ? cg : cg._id
        )
      );
    }
  }, [feeCategoryOpen, editingFeeCategoryId, feeCategoriesResp]);

  const handleClose = () => {
    setSelectedFeeCategoryId(null);
    closeFeeCategoryModal();
  };

  const handleSaveCategory = async () => {
    if (!name.trim() || !amount || classGradeIds.length === 0) return;
    setIsSaving(true);
    try {
      const payload = {
        name: name.trim(),
        amount: Math.round(Number(amount) * 100),
        classGradeIds,
      };
      if (editingFeeCategoryId) {
        await feeCategoryActions.updateFeeCategory(editingFeeCategoryId, payload);
      } else {
        await feeCategoryActions.createFeeCategory(payload);
      }
      mutate(['fee-categories']);
      showToast('Fee category saved successfully', 'fee-category-saved', {
        theme: 'light',
        type: 'success',
      });
      handleClose();
    } catch (error) {
      showToast('Failed to save fee category', 'fee-category-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error saving fee category:', error);
    } finally {
      setIsSaving(false);
    }
  };

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
      <Modal isOpen={feeCategoryOpen} onClose={handleClose} title="Fees category">
        <p
          className={cn(
            'text-base text-gray1 text-center px-16',
            poppins_500.className
          )}
        >
          Input the details of the fee category you want to create
        </p>

        <div className="flex flex-col items-center gap-8 justify-center">
          <Input
            label="Category name"
            placeholder="Juniors school fees"
            value={name}
            handleChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <Input
            label="Amount"
            placeholder="100"
            type="number"
            value={amount}
            handleChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
          <div className="w-full">
            <p className={cn('text-sm text-gray6 mb-2 text-left', poppins_400.className)}>
              Class involved
            </p>
            <ClassGradeDropdown
              multiselect
              value={classGradeIds}
              onValueChange={(v) => setClassGradeIds(Array.isArray(v) ? v : [v])}
              placeholder="Select classes"
              className="w-full"
            />
          </div>
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
            onClick={handleSaveCategory}
            disabled={!name.trim() || !amount || classGradeIds.length === 0 || isSaving}
            loading={isSaving}
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
