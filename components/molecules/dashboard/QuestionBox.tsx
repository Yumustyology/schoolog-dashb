import { Inter_400 } from '@/app/lib/config/font.config';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/app/lib/utils';
import React from 'react';

function QuestionBox() {
  return (
    <div className="grid w-full gap-2">
      <Label
        htmlFor="answer"
        className={cn('text-[16px] text-gray1', Inter_400.className)}
      >
        Why do you want to join this club{' '}
      </Label>
      <Textarea
        className="h-[120px] text-gray border border-gray2 rounded-sm p-4 focus:border-none  focus:outline-none"
        placeholder="Input your answer here "
        id="answer"
      />
    </div>
  );
}

export default QuestionBox;
