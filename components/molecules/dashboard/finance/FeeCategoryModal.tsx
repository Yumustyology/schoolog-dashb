'use client';
import React from 'react';
import Modal from '../../Modal';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import {
  closeFeeCategoryModal,
  feeCategoryOpenState,
  selectedFeeCategoryState,
} from '@/app/lib/entities/payment.entity';
import { useEntity } from 'simpler-state';
import showToast from '@/app/lib/utils/toast';
import feeCategoryActions from '@/app/lib/actions/fee-category.action';
import { fetchClassGradesAll } from '@/app/lib/actions/class-grade.actions';
import { refreshFeeCategories } from './PaymentCategory';

const FeeCategoryModal: React.FC = () => {
  const open = useEntity(feeCategoryOpenState);
  const selected = useEntity(selectedFeeCategoryState);
  const isEditing = !!selected;

  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [classGrades, setClassGrades] = React.useState<{ id: string; name: string }[]>([]);
  const [selectedClassGradeIds, setSelectedClassGradeIds] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    fetchClassGradesAll()
      .then((res) => {
        setClassGrades(
          (res.data || []).map((c) => ({
            id: String((c as Record<string, unknown>)._id),
            name: String((c as Record<string, unknown>).name || ''),
          }))
        );
      })
      .catch(() => setClassGrades([]));

    if (selected) {
      setName(selected.name);
      // amount is stored in the smallest currency unit; the form works in whole units
      setAmount(String(selected.amount / 100));
      setSelectedClassGradeIds(
        (selected.classGradeIds || []).map((c) => (typeof c === 'string' ? c : c._id))
      );
    } else {
      setName('');
      setAmount('');
      setSelectedClassGradeIds([]);
    }
  }, [open, selected]);

  const toggleClassGrade = (id: string) => {
    setSelectedClassGradeIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast('Category name is required', 'fee-category-missing-name', { type: 'error' });
      return;
    }
    const parsedAmount = Number(amount);
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount < 0) {
      showToast('Enter a valid amount', 'fee-category-missing-amount', { type: 'error' });
      return;
    }
    if (selectedClassGradeIds.length === 0) {
      showToast('Select at least one class', 'fee-category-missing-classes', { type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        amount: Math.round(parsedAmount * 100),
        classGradeIds: selectedClassGradeIds,
      };
      if (isEditing && selected) {
        await feeCategoryActions.updateFeeCategory(selected._id, payload);
        showToast('Fee category updated', 'fee-category-updated', { type: 'success' });
      } else {
        await feeCategoryActions.createFeeCategory(payload);
        showToast('Fee category created', 'fee-category-created', { type: 'success' });
      }
      closeFeeCategoryModal();
      refreshFeeCategories();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={open}
        onClose={closeFeeCategoryModal}
        title={isEditing ? 'Edit fee category' : 'Add fee category'}
      >
        <p className={cn('text-base text-gray1 text-center px-16 mb-6', poppins_400.className)}>
          Input the details of the fee category you want to {isEditing ? 'update' : 'create'}
        </p>

        <div className="flex flex-col gap-6">
          <Input
            label="Category name"
            placeholder="Juniors school fees"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Amount (NGN)"
            type="number"
            placeholder="100"
            value={amount}
            handleChange={(e) => setAmount(e.target.value)}
          />

          <div>
            <label className={cn('label text-gray2 mb-2 block text-sm', poppins_400.className)}>
              Applies to classes
            </label>
            <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto">
              {classGrades.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleClassGrade(c.id)}
                  className={cn(
                    'text-xs px-3 py-1.5 rounded-full border',
                    poppins_400.className,
                    selectedClassGradeIds.includes(c.id)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray6 border-gray4'
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <Button
            onClick={handleSubmit}
            loading={submitting}
            disabled={submitting}
            wide
            round
            className="h-12 rounded-full"
          >
            {isEditing ? 'Save changes' : 'Save category'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FeeCategoryModal;
