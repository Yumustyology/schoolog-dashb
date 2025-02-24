import UploadIcon from "@/app/components/atoms/icons/dashboard/UploadIcon";
import { poppins_400, poppins_500 } from "@/app/lib/config/font.config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/app/lib/utils";

export function UploadAnswer() {
  return (
    <div className="bg-[#F8F8F8] rounded-xl w-[524px] mt-8 cursor-pointer">
      <Label htmlFor="picture" className="flex gap-4 p-2">
        <div className="bg-[#ECECEC] rounded-full p-2.5">
          <UploadIcon />
        </div>
        <div>
          <h2 className={cn('text-gray6 text-sm mb-1', poppins_500.className)}>
            Upload your answer here
          </h2>
          <p className={cn('text-gray6 text-xs', poppins_400.className)}>
            JPEG, PDF or PPT file not more than 10MB
          </p>
        </div>
        <Input
          id="picture"
          type="file"
          className="border-none hidden"
          placeholder="Upload your answer here"
        />
      </Label>
    </div>
  );
}
