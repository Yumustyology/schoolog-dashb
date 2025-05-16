'use client';
// import Input from '@/components/atoms/form/Input';
import { poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { RelationshipDropdownList } from '@/components/atoms/form/RelationshipDropdownList';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';

function page() {
  return (
    <div className="w-[600px] mx-auto  bg-white p-8">
      <p className={cn('text-primary text-xs', poppins_600.className)}>
        Edit Guradian Details
      </p>
      <div className="mb-12 mt-6">
        <h2
          className={cn(
            'text-xl text-center text-gray1 mb-1',
            poppins_500.className
          )}
        >
          Input the details of the student <br /> you want to upload
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
            <RelationshipDropdownList />
          </div>
        </div>

        <div className="flex gap-6">
          <Input
            id="email"
            label="Guardian email"
            type="email"
            labelClassName="label"
            className=" h-11 rounded-lg"
            name="text"
            placeholder="Input email "
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />

          <Input
            id="subject"
            label="Guardian phone number"
            type="text"
            labelClassName="label"
            className=" h-11 rounded-lg"
            name="text"
            placeholder="Input phone number "
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />
        </div>

        <div className="flex gap-6">
          <Input
            id="guardian"
            label="Secondary guardian"
            type="text"
            labelClassName="label"
            className=" h-11 rounded-lg"
            name="text"
            placeholder="Input name"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />

          <Input
            id="subject"
            label="Guardian phone number"
            type="text"
            labelClassName="label"
            className=" h-11 rounded-lg"
            name="text"
            placeholder="Input phone number "
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />
        </div>

        <Input
          id="guardian"
          label="Guardian address"
          type="text"
          labelClassName="label"
          className=" h-11 rounded-lg"
          name="text"
          placeholder="Input address"
          // value={loginInfo.password}
          // handleChange={updateLoginInfo}
        />

        <div className="flex justify-end">
          <Button
            round
            className={`w-[170px] h-[40px] mt-8 bg-primary text-white ml-auto }`}
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default page;
