import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';
import Input from '../../atoms/form/Input';
import Button from '../../atoms/form/Button';

const PreferenceSettings = () => {
  return (
    <div className="min-h-[250px]">
      <form>
        <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
          <div>
            <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
              Preference
            </h2>
            <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
              Adjust your personal preferences to tailor the admin to your need
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
              id="session-timeout"
              label="Session timeout"
              type="text"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="session-timeout"
              placeholder="20 Minutes"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
          </div>
          <div>
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              id="Appearance"
              label="appearance"
              type="text"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="appearance"
              placeholder="Auto"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PreferenceSettings;
