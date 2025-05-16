import React, { useState } from 'react';
import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Switch from '../../atoms/form/Switch';

interface NotificationItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  name: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  name,
}) => {
  return (
    <div>
      <div className="flex-grow flex items-center justify-between px-3 flex-1 w-full bg-[#F8F8F8] h-[52px] rounded-3xl min-w-[600px] mb-4">
        <span
          className={cn(
            'text-sm text-[#333333] capitalize',
            Inter_500.className
          )}
        >
          {label}
        </span>
        <Switch
          id={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          activeColor=""
          activeBorder="border bg-primary border-primary"
          inActiveBorder="border border-[#E0E0E0] bg-[#E0E0E0]"
          inactiveColor="bg-[#EFEFEF]"
        />
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    inApp: {
      announcement: true,
      subjectUpdate: false,
      classUpdate: false,
      assignmentUpdate: true,
      bookUpdate: true,
      messageUpdate: true,
    },
    email: {
      announcement: true,
      subjectUpdate: false,
      classUpdate: false,
      assignmentUpdate: true,
      bookUpdate: false,
      messageUpdate: true,
    },
  });
  console.log(settings);

  const handleSwitchChange = (
    type: 'inApp' | 'email',
    key: string,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  const renderSettings = (type: 'inApp' | 'email') =>
    Object.keys(settings[type]).map((key) => (
      <NotificationItem
        key={key + settings[type]}
        name={key + settings[type]}
        label={key.replace(/([A-Z])/g, ' $1')}
        checked={settings[type][key as keyof (typeof settings)['inApp']]}
        onChange={(checked: boolean) => handleSwitchChange(type, key, checked)}
      />
    ));

  return (
    <div>
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Notification preference
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Set your notification preference to control the type of
            notifications you receive.
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex gap-14 justify-between">
          <div>
            <h2 className={cn(Inter_600.className, 'text-black1 mb-3 text-lg')}>
              In App notification
            </h2>
            <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
              Manage notification that you receive on this app
            </p>
          </div>
          <div className="">{renderSettings('inApp')}</div>
        </div>
        <div className="border border-[#EAECF0] my-6" />
        <div className="flex gap-14 justify-between">
          <div>
            <h2 className={cn(Inter_600.className, 'text-black1 mb-3 text-lg')}>
              Email Notification
            </h2>
            <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
              Manage notification that is sent to your email
            </p>
          </div>
          <div className="">{renderSettings('email')}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
