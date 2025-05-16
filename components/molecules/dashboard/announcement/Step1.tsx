import Input from '@/components/atoms/form/Input';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { AddedResource } from '@/components/atoms/dashboard/subjects/AddedResource';
import AnnoucementUploadBox from '@/components/atoms/dashboard/announcement/AnnoucementUploadBox';

function Step1() {
  return (
    <div>
      <div className="mb-12 mt-6">
        <p className={cn('text-primary text-xs', poppins_600.className)}>
          Create Annoucement
        </p>
        <h2
          className={cn(
            'text-xl text-gray1 mb-1 text-cente mt-3',
            poppins_500.className
          )}
        >
          Input announcement details to proceed
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        <Input
          id="annoucemen "
          label="Annoucement title"
          type="text"
          labelClassName="label"
          className="input h-14 rounded-lg"
          name="text"
          placeholder="Input resource name"
          // value={loginInfo.password}
          // handleChange={updateLoginInfo}
        />

        <Input
          id="description"
          type="textarea"
          label="Description"
          labelClassName="label"
          name="text"
          placeholder="Input description"
          // value={loginInfo.password}
          // handleChange={updateLoginInfo}
        />

        <div className="flex flex-col gap-3">
          <AnnoucementUploadBox />
        </div>
      </div>
    </div>
  );
}

export default Step1;
