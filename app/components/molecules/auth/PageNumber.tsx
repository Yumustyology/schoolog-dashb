import { poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';

export default function ProgressPageNumber({
  totalSteps,
  activeStep,
}: ProgressIndicatorProps) {
  return (
    <div>
      {/* Step Counter */}
      <p className={cn("text-base text-gray3", poppins_600.className)}>
        <span className="text-primary">{activeStep} </span>/ {totalSteps}
      </p>

      {/* Progress Bars */}
      <div className="flex gap-2 mb-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`h-[4px] w-[31px] ${
              index < activeStep ? "bg-primary" : "bg-[#F2EEFB]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}



export default PageNumber;
