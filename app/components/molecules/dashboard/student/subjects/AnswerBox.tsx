import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import React, { useState } from 'react';
import { UploadAnswer } from './UploadAnswer';
import { ImageViewModal } from '../../../ImageViewModal';

type AnswerBoxProps = {
  question: string[] | string;
  mark: number;
  answerType?: 'upload' | 'select' | 'text';
  questionType?: 'images' | 'text';
  multipleChoice?: boolean;
};

const options: Option[] = [
  { id: 1, label: 'Urbanisation' },
  { id: 2, label: 'Industrialisation' },
  { id: 3, label: 'Climate change' },
  { id: 4, label: 'Mining' },
];

function AnswerBox({
  question,
  mark,
  answerType = 'text',
  questionType = 'text',
  multipleChoice,
}: AnswerBoxProps) {
  return (
    <div className="grid w-full gap-4">
      <div
        className={cn(
          'flex justify-between items-center gap-10',
          questionType == 'images' && 'items-start'
        )}
      >
        {questionType == 'text' ? (
          <Label
            htmlFor="answer"
            className={cn('text-[18px] text-gray1', poppins_500.className)}
          >
            {question}
          </Label>
        ) : (
          <ImageViewModal />
        )}
        <p className={cn('text-[14px] text-gray1 ', poppins_500.className)}>
          {mark}{' '}
          <span className={cn('text-gray3', poppins_400.className)}>
            {' '}
            Marks
          </span>{' '}
        </p>
      </div>
      {answerType == 'text' ? (
        <Textarea
          className={cn(
            'focus:outline-primary rounded-lg text-base placeholder:text-base placeholder-poppins h-[120px] text-gray border border-gray2 p-4 focus:border-none  focus:outline-none',
            poppins_500.className
          )}
          placeholder="Input your answer here "
          id="answer"
        />
      ) : answerType == 'select' ? (
        <RadioButtons multipleChoice={multipleChoice} options={options} />
      ) : (
        answerType == 'upload' && <UploadAnswerComp />
      )}
    </div>
  );
}

export default AnswerBox;

interface Option {
  id: number;
  label: string;
}

interface Option {
  id: number;
  label: string;
}

interface RadioButtonsProps {
  options: Option[];
  multipleChoice?: boolean;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  multipleChoice = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleSelection = (id: number) => {
    if (multipleChoice) {
      setSelectedOptions((prev) =>
        prev.includes(id)
          ? prev.filter((optionId) => optionId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedOptions([id]);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: number
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSelection(id);
    }
  };

  return (
    <div className={cn('grid grid-cols-2 gap-4')}>
      {options.map((option) => (
        <div
          key={option.id}
          className={cn(
            'flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all',
            selectedOptions.includes(option.id)
              ? 'border-primary bg-green-50'
              : 'border-gray2',
            'focus:outline-primary'
          )}
          tabIndex={0}
          onClick={() => handleSelection(option.id)}
          onKeyDown={(e) => handleKeyDown(e, option.id)}
          role={multipleChoice ? 'checkbox' : 'radio'}
          aria-checked={selectedOptions.includes(option.id)}
        >
          <span className="text-gray3">{option.label}</span>
          <span
            className={cn(
              'w-4 h-4 border rounded-full flex items-center justify-center',
              selectedOptions.includes(option.id)
                ? 'border-primary'
                : 'border-gray2'
            )}
          >
            {selectedOptions.includes(option.id) && (
              <span className="w-2 h-2 bg-primary rounded-full"></span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

const UploadAnswerComp = () => {
  return (
    <div className="">
      <h2 className={cn('text-black1 text-[18px] mb-2', poppins_500.className)}>
        Your answers
      </h2>
      <p className={cn('text-[#475467] text-sm  ', poppins_400.className)}>
        Click the button below to upload assignment
      </p>

      <div className="cursor-pointer">
        <UploadAnswer />
      </div>
    </div>
  );
};
