import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import React from 'react';

type AnswerBoxProps = {
  question: string;
  mark: number;
};
function AnswerBox({ question, mark }: AnswerBoxProps) {
  return (
    <div className="grid w-full gap-4">
      <div className="flex justify-between items-center gap-10">
        <Label
          htmlFor="answer"
          className={cn('text-[18px] text-gray1', poppins_500.className)}
        >
          {question}
        </Label>
        <p className={cn('text-[14px] text-gray1 ', poppins_500.className)}>
          {mark} <span className={cn('', poppins_400.className)}> Marks</span>{' '}
        </p>
      </div>
      <Textarea
        className="h-[120px] text-gray border border-gray2 rounded-sm p-4 focus:border-none  focus:outline-none"
        placeholder="Input your answer here "
        id="answer"
      />
    </div>
  );
}

export default AnswerBox;
