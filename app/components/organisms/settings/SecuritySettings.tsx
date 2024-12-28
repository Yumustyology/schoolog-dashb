import { Inter_400, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';
import Button from '../../atoms/form/Button';
import LockIcon from '../../atoms/icons/LockIcon';

const SecuritySettings = () => {
  return (
    <div>
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2
            className={cn(Inter_600.className, 'text-[#101828] mb-2 text-lg')}
          >
            Security Settings
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Configure your security settings to protect your account
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-7">
        <Button className="bg-transparent h-32 text-left flex gap-12 justify-between items-center border border-[#E5E5EA] p-5 rounded-lg">
          <div>
            <h2
              className={cn(
                `mb-2 text-base text-[#101828]`,
                Inter_600.className
              )}
            >
              Change password
            </h2>
            <p className={cn('text-[#475467] text-sm', Inter_400.className)}>
              Change your password to enhance security and protect your account
              from unauthorized individual
            </p>
          </div>
          <div className="flex-shrink-0 h-[42px] w-[42px] flex items-center justify-center bg-[#21B55A1F] rounded-full">
            <LockIcon />
          </div>
        </Button>
        <Button className="text-left bg-transparent h-32 cursor-pointer flex gap-12 justify-between items-center border border-[#E5E5EA] p-5 rounded-lg">
          <div>
            <h2
              className={cn(
                `mb-2 text-base text-[#101828]`,
                Inter_600.className
              )}
            >
              Active sessions
            </h2>
            <p className={cn('text-[#475467] text-sm', Inter_400.className)}>
              End all session to logout from all devices ensuring that your
              account is only accessible from your current session
            </p>
          </div>
          <div className="flex-shrink-0 h-[42px] w-[42px] flex items-center justify-center bg-[#21B55A1F] rounded-full">
            <LockIcon />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
