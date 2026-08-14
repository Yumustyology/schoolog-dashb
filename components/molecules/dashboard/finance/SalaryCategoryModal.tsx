import React, { useRef, useState } from 'react';
import Modal from '../../Modal';
import { cn } from '@/app/lib/utils';
import { poppins_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import {
  closeSalaryCategoryModal,
  salaryCategoryOpenState,
} from '@/app/lib/entities/payment.entity';
import { useEntity } from 'simpler-state';
import Input from '@/components/atoms/form/Input';
import { IoAdd } from 'react-icons/io5';
import SubtotalDetail, { SubtotalDetailHandles } from './SubtotalDetail'; // ⬅️ import the component here
import type { Subtotal } from '@/app/lib/types/finance.types';

const SalaryCategoryModal: React.FC = () => {
  const salaryCategoryOpen = useEntity(salaryCategoryOpenState);
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
        isOpen={salaryCategoryOpen}
        onClose={closeSalaryCategoryModal}
        title="Salary category"
      >
        <p
          className={cn(
            'text-base text-gray1 text-center px-9',
            poppins_500.className
          )}
        >
          Input the details of the salary category you want to create
        </p>

        <div className="flex flex-col items-center mt-3 gap-8 justify-center">
          <Input label="Category name" placeholder="Grade 1" />
          <Input label="Amount ($)" placeholder="100" />
          <Input label="Teachers grades" placeholder="Select grades" />
        </div>

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
            onClick={closeSalaryCategoryModal}
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

export default SalaryCategoryModal;
