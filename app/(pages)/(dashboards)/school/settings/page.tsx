'use client';
import SettingCardBg from '@/components/atoms/images/SettingCardBg';
import { Inter_400, Inter_600 } from '@/app/lib/config/font.config';
import Image from 'next/image';
import React from 'react';
import { TabsHeader } from '@material-tailwind/react';
import Tabs, { Tab } from '@material-tailwind/react/components/Tabs';
import { cn } from '@/app/lib/utils';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import EditProfile from '@/components/organisms/settings/EditProfile';
import SecuritySettings from '@/components/organisms/settings/SecuritySettings';
import NotificationSettings from '@/components/organisms/settings/NotificationSettings';
import PreferenceSettings from '@/components/organisms/settings/PreferenceSettings';
import DomainManagement from '@/components/organisms/settings/DomainManagement';
import { teacherImg2 } from '@/app/assets';
import { profileState } from '@/app/lib/entities/profile.entity';

const Page = () => {
  const profile = profileState.use();
  const data = [
    {
      label: 'Profile',
      value: 'my-profile',
      content: <EditProfile />,
    },
    {
      label: 'Security',
      value: 'security-settings',
      content: <SecuritySettings />,
    },
    {
      label: 'Notification',
      value: 'notification',
      content: <NotificationSettings />,
    },
    {
      label: 'Preference',
      value: 'preference',
      content: <PreferenceSettings />,
    },
    {
      label: 'Domains',
      value: 'domains',
      content: <DomainManagement />,
    },
  ];

  const { activeTab, handleTabClick } = useActiveTab('profile', data);

  return (
    <div>
      <div>
        <div className="w-full h-[289px] rounded-t-lg overflow-hidden bg-white relative">
          <SettingCardBg />
          <div className="h-[110px] w-[110px] border-[3px] border-white rounded-full absolute top-16 left-6 overflow-hidden">
            <Image alt="avatar" height={130} width={130} src={teacherImg2} />
          </div>
          <div className="absolute pt-6 left-36 w-full">
            <p className={cn(Inter_600.className, 'text-xl text-black mb-1.5')}>
              {profile.firstName || profile.lastName
                ? `${profile.firstName} ${profile.lastName}`.trim()
                : 'Administrator'}
            </p>
            <p
              className={cn(
                'font-normal text-gray6 text-base',
                Inter_400.className
              )}
            >
              Administrator{profile.email ? ` / ${profile.email}` : ''}
            </p>
          </div>

          <div className="absolute bottom-0 border-t mt-3 border-b border-t-[#E5E5EA] border-b-[#E5E5EA] w-full">
            <div className="w-full ml-6 -mb-1">
              <Tabs
                value={activeTab}
                onChange={(value: string) => {
                  handleTabClick(value);
                }}
              >
                <TabsHeader
                  className="bg-white max-w-[641px] rounded-none text-base border-box"
                  indicatorProps={{
                    className:
                      'border-b-4 border-b-primary rounded-none shadow-none',
                  }}
                >
                  {data.map(({ label, value }) => (
                    <Tab
                      className={`p-4 ${
                        activeTab === value ? 'text-gray1' : 'text-gray'
                      }`}
                      key={value}
                      onClick={() => handleTabClick(value)}
                      value={value}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-2xl p-6">
          {data.map((tab) =>
            activeTab === tab.value ? (
              <div key={tab.value}>{tab.content}</div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
