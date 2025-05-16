'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';
import {
  Inter_600,
  Inter_400,
  poppins_400,
} from '@/app/lib/config/font.config';
import ImageUploader from '@/components/atoms/form/ImageUploader';
import CustomImageUploaderSmall from './CustomImageUploaderSmall';
import { IoAdd } from 'react-icons/io5';
import Button from '@/components/atoms/form/Button';

function PartnerLogosTemplateEdit() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [partners, setPartners] = React.useState<number[]>([1, 2, 3, 4, 5, 6]);

  const handleImageChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleAddPartner = () => {
    setPartners((prev) => [...prev, prev.length + 1]);
  };

  return (
    <form className="bg-white p-6 rounded-lg mb-8">
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Partners logos
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Upload and change partners logo
          </p>
        </div>

        <Button type="button" className="text-white text-sm rounded-full">
          Save changes
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {partners.map((i) => (
          <div key={i} className="bg-white relative w-full ">
            <label
              className={cn(
                'block text-left w-full text-base mb-2 text-gray1 font-medium',
                poppins_400.className
              )}
            >
              Partner logo {i}
            </label>
            <ImageUploader
              className="flex items-center !bg-[#F8F8F8] lg:h-[70px] overflow-hidden"
              onImageSelected={(file) => handleImageChange(file!)}
              renderUI={(props) => (
                <CustomImageUploaderSmall
                  className="flex flex-row items-center gap-4"
                  {...props}
                  selectedFile={selectedFile}
                />
              )}
              overwriteAccepted={true}
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={handleAddPartner}
        className="flex bg-[#F8F8F8] text-gray1 items-center rounded-full px-3 "
      >
        <IoAdd />
        Add Partner
      </Button>
    </form>
  );
}

export default PartnerLogosTemplateEdit;
