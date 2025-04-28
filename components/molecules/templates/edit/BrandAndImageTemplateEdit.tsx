'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { Inter_600, Inter_400 } from '@/app/lib/config/font.config';
import ImageUploader from '@/components/atoms/form/ImageUploader';
import CustomImageUploaderSmall from './CustomImageUploaderSmall';

type ImageField = {
  label: string;
  fieldName: string;
};

type BrandAndImageSettingsFormProps = {
  imageFields: ImageField[];
};

export function BrandAndImageTemplateEdit({
  imageFields,
}: BrandAndImageSettingsFormProps) {
  const [selectedFiles, setSelectedFiles] = React.useState<
    Record<string, File | null>
  >({});

  const handleImageChange = (fieldName: string, file: File) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Brand and images settings
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Input and edit template & brand images.
          </p>
        </div>
        <Button className="text-white text-sm rounded-full">
          Save changes
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {imageFields.map(({ label, fieldName }, index) => (
          <div key={index} className="bg-white relative w-full mb-6">
            <label
              className={cn(
                'block text-left w-full text-base mb-2 text-gray1 font-medium',
                poppins_400.className
              )}
            >
              {label}
            </label>
            <ImageUploader
              className="flex items-center !bg-[#F8F8F8] lg:h-[70px] overflow-hidden"
              onImageSelected={(file) => handleImageChange(fieldName, file!)}
              renderUI={(props) => (
                <CustomImageUploaderSmall
                  className="flex flex-row items-center gap-4"
                  {...props}
                  selectedFile={selectedFiles[fieldName] || null}
                />
              )}
              overwriteAccepted={true}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
