'use client';

import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Input from '../../atoms/form/Input';
import Button from '../../atoms/form/Button';
import SelectComp from '../../atoms/form/Select';
import { CountriesSelect } from '../../atoms/form/CountriesSelect';
import { PhoneNumberInput } from '../../atoms/form/PhoneNumberInput';
import { setTheme, themeState } from '@/app/lib/entities/theme.entity';
import { themes } from '@/app/lib/themes/themeConfig';
import adminActions, {
  UpdateAdminProfilePayload,
} from '@/app/lib/actions/admin.action';
import showToast from '@/app/lib/utils/toast';

const EditProfile = () => {
  const currentTheme = themeState.use();
  const { data: resp, isLoading, mutate } = useSWR(
    ['admin-profile'],
    () => adminActions.fetchMyProfile()
  );
  const profile = resp?.data;

  const [form, setForm] = useState<UpdateAdminProfilePayload>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setForm({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      phoneNumber: profile.phoneNumber || '',
      dob: profile.dob ? profile.dob.slice(0, 10) : '',
      gender: profile.gender || '',
      country: profile.country || '',
    });
  }, [profile]);

  const updateField = (patch: Partial<UpdateAdminProfilePayload>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await adminActions.updateMyProfile(form);
      showToast('Profile updated', 'success', { type: 'success' });
      mutate();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
          <div>
            <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
              Profile settings
            </h2>
            <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
              Update your personal information
            </p>
          </div>
          <Button
            type="button"
            onClick={handleSave}
            loading={isSaving}
            disabled={isSaving || isLoading}
            className="text-white text-sm rounded-full"
          >
            Save changes
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              id="firstName"
              label="First name"
              type="text"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="firstname"
              placeholder="First name"
              value={form.firstName ?? ''}
              handleChange={(e) => updateField({ firstName: e.target.value })}
            />
            <PhoneNumberInput
              className={cn(
                Inter_500.className,
                'text-base text-gray1 input h-14 rounded-lg'
              )}
              id="phoneNumber"
              label="Phone number"
              labelClassName="label mt-6"
              onPhoneChange={(value) => updateField({ phoneNumber: value })}
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
              value={form.dob ?? ''}
              handleChange={(e) => updateField({ dob: e.target.value })}
            />
            <SelectComp
              onValueChange={(v) => updateField({ gender: v })}
              labelClassName="label mt-6"
              value={form.gender ?? ''}
              htmlFor="gender"
              placeholder="Select gender"
              options={[
                { id: 'male', name: 'Male' },
                { id: 'female', name: 'Female' },
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
              value={form.lastName ?? ''}
              handleChange={(e) => updateField({ lastName: e.target.value })}
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
              value={profile?.email ?? ''}
              disabled
              handleChange={() => {}}
            />
            <CountriesSelect
              labelClassName="label mt-6"
              value={form.country ?? ''}
              onChange={(v) => updateField({ country: v })}
            />
          </div>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-t-[#E5E5EA]">
        <h2 className={cn(Inter_600.className, 'text-black1 mb-3 text-lg')}>
          Appearance
        </h2>
        <select
          value={currentTheme}
          onChange={(e) => setTheme(e.target.value as keyof typeof themes)}
          className="border p-2 rounded"
        >
          {Object.keys(themes).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EditProfile;
