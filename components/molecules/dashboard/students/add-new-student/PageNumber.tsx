import { poppins_600 } from '@/app/lib/config/font.config';
import {
  createAddStudentProgressState,
  createAddStudentSetStep,
  totalNumberSteps,
} from '@/app/lib/entities/student.entity';
import { cn } from '@/app/lib/utils';
import { useEntity } from 'simpler-state';

export default function ProgressPageNumber() {
  const activeStep = useEntity(createAddStudentProgressState);
  const totalSteps = totalNumberSteps;
  return (
    <div>
      {/* Step Counter */}
      <p className={cn('text-base text-gray3', poppins_600.className)}>
        <span className="text-primary">{activeStep + 1} </span>/ {totalSteps}
      </p>

      {/* Progress Bars */}
      <div className="flex gap-2 mb-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            onClick={() => createAddStudentSetStep(index)}
            key={index}
            className={`rounded-full cursor-pointer h-[4px] w-[31px] ${
              index < activeStep + 1 ? 'bg-primary' : 'bg-[#F2EEFB]'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
