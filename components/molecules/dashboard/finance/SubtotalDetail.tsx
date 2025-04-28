import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { IoClose, IoCheckmark, IoPencil } from 'react-icons/io5';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { CloseIcon, EditIcon } from '@/components/atoms/icons/Icons';

interface Subtotal {
  id: number;
  title: string;
  price: string;
}

export interface SubtotalDetailHandles {
  handleSave: () => void;
}

interface SubtotalDetailProps {
  subtotal: Subtotal;
  isEditing: boolean;
  setIsEditing: () => void;
  onEdit: (updatedSubtotal: Subtotal) => void;
  onRemove: (id: number) => void;
  pruneEditing: () => void;
}

const SubtotalDetail = forwardRef<SubtotalDetailHandles, SubtotalDetailProps>(
  (
    { subtotal, isEditing, setIsEditing, onEdit, onRemove, pruneEditing },
    ref
  ) => {
    const [title, setTitle] = useState(subtotal.title);
    const [price, setPrice] = useState(subtotal.price);
    const [errors, setErrors] = useState<{ title?: string; price?: string }>(
      {}
    );

    useEffect(() => {
      setTitle(subtotal.title);
      setPrice(subtotal.price);
    }, [subtotal]);

    const validate = (): boolean => {
      const newErrors: { title?: string; price?: string } = {};
      if (!title.trim()) newErrors.title = 'Title is required';
      if (!price.toString().trim()) newErrors.price = 'Price is required';
      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
      if (!validate()) return false;
      onEdit({
        ...subtotal,
        title,
        price,
      });

      pruneEditing();
      setErrors({});

      return true;
    };

    useImperativeHandle(ref, () => ({
      handleSave,
    }));

    return (
      <div className="flex items-center gap-3-- mb-4">
        {isEditing ? (
          <>
            <div className="flex gap-3 flex-1">
              <Input
                placeholder="Title"
                value={title}
                handleChange={(e) => setTitle(e.target.value)}
                errMsg={errors.title}
                className={cn(errors.title && 'border border-red-500')}
              />
              <Input
                placeholder="Price"
                type="number"
                value={price}
                handleChange={(e) => setPrice(e.target.value)}
                errMsg={errors.price}
                className={cn(errors.price && 'border border-red-500')}
              />
            </div>

            <Button
              round
              onClick={handleSave}
              className="bg-green-100 hover:bg-green-200 mx-2.5 bg-opacity-5 transition rounded-full p-1.5"
              aria-label="Save"
            >
              <IoCheckmark size={18} color="#27AE60" />
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 w-full pr-4">
              <div className="bg-[#f8f8f8] max-h-[60px] border border-gray4 rounded-[8px] p-3 w-full flex items-center gap-2">
                <div>
                  <h3 className={cn('text-sm mb-1', poppins_500.className)}>
                    {title || 'Untitled'}
                  </h3>
                  <p className={cn('text-xs text-gray', poppins_400.className)}>
                    {price || '₦0'}
                  </p>
                </div>
              </div>

              <div className="flex">
                <Button
                  className="bg-gray10 bg-opacity-10 rounded-full p-1.5"
                  onClick={() => setIsEditing()}
                >
                  <EditIcon color="#001F3F" size={18} />
                </Button>
              </div>
            </div>
          </>
        )}

        <Button
          className="bg-[#EB57570F] bg-opacity-5 rounded-full p-1.5"
          onClick={() => onRemove(subtotal.id)}
        >
          <CloseIcon />
        </Button>
      </div>
    );
  }
);

SubtotalDetail.displayName = 'SubtotalDetail';

export default SubtotalDetail;
