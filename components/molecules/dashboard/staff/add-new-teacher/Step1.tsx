import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { GenderSelectionDropdown } from '@/components/atoms/form/GenderSelectetionDropdown';

function Step1() {
  return (
    <div>
      <div className="mb-12 mt-6">
        <p className={cn('text-primary text-xs', poppins_600.className)}>
          Teacher Details
        </p>
        <h2
          className={cn(
            'text-xl text-gray1 mb-1 text-center',
            poppins_500.className
          )}
        >
          Input the details of the teacher <br /> you want to upload
        </h2>
      </div>

      <form action="" method="post" className="flex flex-col gap-4">
        <div className="flex gap-6 items-center">
          <div className="flex-1">
            <Input
              id="subject"
              label="Full name"
              type="text"
              labelClassName="label text-gray2 mb-0"
              className=" h-11 rounded-lg"
              name="text"
              placeholder="Input your full name"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
          </div>
          <div className="flex-1">
            <Input
              id="phoneNumber"
              label="Phone Number"
              type="num"
              labelClassName="label text-gray2 mb-0"
              className=" h-11 rounded-lg"
              name="text"
              placeholder="Input your phone number"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex-1">
            <Input
              id="email"
              label="Email"
              type="email"
              labelClassName="label text-gray2 mb-0"
              className=" h-11 rounded-lg"
              name="text"
              placeholder="Input your email"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
          </div>
          <div className="flex-1">
            <GenderSelectionDropdown />
          </div>
        </div>

        <Input
          id="dob"
          label="Date of birth"
          type="date"
          labelClassName="label"
          className=" h-11 rounded-lg"
          name="text"
          placeholder="Input date "
          // value={loginInfo.password}
          // handleChange={updateLoginInfo}
        />

        <Input
          id="address"
          label="Address"
          type="text"
          labelClassName="label"
          className=" h-11 rounded-lg"
          name="text"
          placeholder="Input date "
          // value={loginInfo.password}
          // handleChange={updateLoginInfo}
        />
      </form>

      <div className="flex justify-between items-center border border-gray5 p-2 mt-6 rounded-[66px]">
        <div className="flex items-center gap-3">
          <Button className="bg-gray4 rounded-full w-10 h-10 flex items-center justify-center border border-gray4">
            {/* <UploadImageIcon /> */}upload
          </Button>
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            {' '}
            Upload teacher image{' '}
          </p>
        </div>

        <Button round className="bg-[#E8EBEA] h-[33px]">
          {/* <Upload_Icon /> */}
          <span className={cn('text-sm text-primary', poppins_400.className)}>
            Upload
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Step1;
