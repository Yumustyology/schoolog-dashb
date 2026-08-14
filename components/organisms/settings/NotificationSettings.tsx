import React from 'react';
import useSWR from 'swr';
import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Switch from '../../atoms/form/Switch';
import notificationPreferencesActions, {
  NotificationChannelPreferences,
} from '@/app/lib/actions/notification-preferences.action';

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

const CHANNEL_KEYS: (keyof NotificationChannelPreferences)[] = [
  'announcement',
  'subjectUpdate',
  'classUpdate',
  'assignmentUpdate',
  'bookUpdate',
  'messageUpdate',
];

const NotificationSettings = () => {
  const { data: resp, mutate } = useSWR(['notification-preferences'], () =>
    notificationPreferencesActions.fetchMyNotificationPreferences()
  );
  const preferences = resp?.data;

  const handleSwitchChange = (
    type: 'inApp' | 'email',
    key: keyof NotificationChannelPreferences,
    value: boolean
  ) => {
    if (!preferences) return;

    // Optimistic local update, then persist — revert via mutate() if the
    // request fails so the UI never drifts from what's actually saved.
    mutate(
      {
        ...resp!,
        data: { ...preferences, [type]: { ...preferences[type], [key]: value } },
      },
      false
    );

    notificationPreferencesActions
      .updateMyNotificationPreferences({ [type]: { [key]: value } })
      .then(() => mutate())
      .catch(() => mutate());
  };

  const renderSettings = (type: 'inApp' | 'email') =>
    preferences &&
    CHANNEL_KEYS.map((key) => (
      <NotificationItem
        key={key}
        name={`${type}-${key}`}
        label={key.replace(/([A-Z])/g, ' $1')}
        checked={preferences[type][key]}
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
