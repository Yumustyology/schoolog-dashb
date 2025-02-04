import { poppins_600 } from "@/app/lib/config/font.config";
import { cn } from "@/lib/utils";

const PageNumber = () => {
  return (
    <div>
      <p className={cn('text-base text-gray3', poppins_600.className)}>
        <span className="text-primary">1 </span>/2
      </p>
      <div className="flex gap-2 mb-2">
        <div className="h-[4px] w-[31px] bg-primary"></div>
        <div className="h-[4px] w-[31px] bg-[#F2EEFB]"></div>
      </div>
    </div>
  );
};

export default PageNumber