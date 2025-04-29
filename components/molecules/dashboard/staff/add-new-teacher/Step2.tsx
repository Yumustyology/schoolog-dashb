import Input from '@/components/atoms/form/Input';
import { poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { RelationshipDropdownList } from '@/components/atoms/form/RelationshipDropdownList';
import { TeachersRoleDropdownList } from '@/components/atoms/form/TeachersRoleDropdown';
import { SalaryCategoryDropdownList } from '@/components/atoms/form/SalaryCategoryDropdown';
import { BanksDropdownList } from '@/components/atoms/form/BanksDropdown';

function Step2() {
  return (
    <div>
      <div className="mb-12 mt-6">
        <p className={cn('text-primary text-xs', poppins_600.className)}>Guradian Details</p>
        <h2 className={cn('text-xl text-center text-gray1 mb-1', poppins_500.className)}>
          Input the details of the teacher <br /> you want to upload
        </h2>

      </div>

      <form action="" method="post" className='flex flex-col gap-4'>
        <div className='flex gap-6 items-center'>
          <div className='flex-1'>

            <TeachersRoleDropdownList />
          </div>
          <div className='flex-1'>
            <RelationshipDropdownList />
          </div>


        </div>

        <SalaryCategoryDropdownList />



        <Input
          id="subject"
          label="Subject(s)"
          type="text"
          labelClassName="label"
          className=" h-11 rounded-lg"
          name="text"
          placeholder="Input phone number "
        // value={loginInfo.password}
        // handleChange={updateLoginInfo}
        />


        <div>

          <h4 className={cn('text-xl text-gray1 mt-4', poppins_500.className)}>Bank information</h4>

        </div>

        <div className='flex gap-6 items-center'>
          <div className='flex-1'>

            <BanksDropdownList />

          </div>
          <div className='flex-1'>
            <Input
              id="accountNumber"
              label="Account Number"
              type="text"
              labelClassName="label"
              className=" h-11 rounded-lg"
              name="text"
              placeholder="Input address"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
            />
          </div>


        </div>

        <Input
          id="guardian"
          label="Account Name"
          type="text"
          labelClassName="label"
          className=" h-11 rounded-lg"
          name="text"
          placeholder="Account name will show here once the account is verified"
        // value={loginInfo.password}
        // handleChange={updateLoginInfo}
        />


      </form>



    </div>
  );
}

export default Step2;
