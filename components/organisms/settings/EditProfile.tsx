import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import Input from '../../atoms/form/Input';
import Button from '../../atoms/form/Button';
import SelectComp from '../../atoms/form/Select';
import { CountriesSelect } from '../../atoms/form/CountriesSelect';
import { PhoneNumberInput } from '../../atoms/form/PhoneNumberInput';

const EditProfile = () => {
  return (
    <div>
      <form>
        <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
          <div>
            <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
              Email settings
            </h2>
            <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
              Configure the application email settings
            </p>
          </div>
          <Button className="text-white text-sm rounded-full">
            Save changes
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              id="email"
              label="First name"
              type="text"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="firstname"
              placeholder="First name"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
            {/* <Input
              inputClassName={cn(Inter_500.className,"text-base text-gray1")}
              id="phone-number"
              label="Phone number"
              type="tel"
              labelClassName="label mt-6"
              className="input h-14 rounded-lg"
              name="phone-number"
              placeholder="Phone number"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            /> */}
            <PhoneNumberInput
              className={cn(
                Inter_500.className,
                'text-base text-gray1 input h-14 rounded-lg'
              )}
              id="phoneNumber"
              label="Phone number"
              labelClassName="label mt-6"
              // className="input h-14 rounded-lg"
            />
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              id="dob"
              label="Date of Birth"
              type="date"
              labelClassName="label mt-6"
              className="input h-14 rounded-lg"
              name="dob"
              placeholder="Date of birth"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
            <SelectComp
              onValueChange={console.log}
              labelClassName="label mt-6"
              value=""
              htmlFor="gender"
              placeholder="Select gender"
              options={[
                {
                  id: 'male',
                  name: 'Male',
                },
                {
                  id: 'female',
                  name: 'Female',
                },
              ]}
              label="Gender"
            />
          </div>
          <div>
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              id="lastName"
              label="Last name"
              type="text"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="lastName"
              placeholder="Last Name"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              id="email"
              label="Email Address"
              type="email"
              labelClassName="label mt-6"
              className="input h-14 rounded-lg"
              name="email"
              placeholder="Email Address"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
            {/* <Input
              inputClassName={cn(Inter_500.className,"text-base text-gray1")}
              id="email"
              label="First name"
              type="first-name"
              labelClassName="label mt-6"
              className="input h-14 rounded-lg"
              name="email"
              placeholder="Email Address"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            /> */}
            <CountriesSelect labelClassName="label mt-6" />
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              id="email"
              label="First name"
              type="first-name"
              labelClassName="label mt-6"
              className="input h-14 rounded-lg"
              name="email"
              placeholder="Email Address"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
