'use client';

import { Inter_400, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Input from '../../atoms/form/Input';
import Button from '../../atoms/form/Button';
import adminActions, { AdminPreferences } from '@/app/lib/actions/admin.action';
import showToast from '@/app/lib/utils/toast';

const PreferenceSettings = () => {
  const { data: resp, isLoading, mutate } = useSWR(
    ['admin-profile'],
    () => adminActions.fetchMyProfile()
  );
  const profile = resp?.data;

  const [form, setForm] = useState<AdminPreferences>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setForm({
      sessionTimeoutMinutes: profile.preferences?.sessionTimeoutMinutes ?? null,
      appearance: profile.preferences?.appearance ?? '',
    });
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await adminActions.updateMyProfile({ preferences: form });
      showToast('Preferences updated', 'success', { type: 'success' });
      mutate();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[250px]">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
          <div>
            <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
              Preference
            </h2>
            <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
              Adjust your personal preferences to tailor the admin to your need
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
              inputClassName={cn(Inter_400.className, 'text-base text-gray1')}
              id="session-timeout"
              label="Session timeout (minutes)"
              type="number"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="session-timeout"
              placeholder="20"
              value={form.sessionTimeoutMinutes ?? ''}
              handleChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sessionTimeoutMinutes: e.target.value
                    ? Number(e.target.value)
                    : null,
                }))
              }
            />
          </div>
          <div>
            <Input
              inputClassName={cn(Inter_400.className, 'text-base text-gray1')}
              id="Appearance"
              label="Appearance"
              type="text"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="appearance"
              placeholder="Auto"
              value={form.appearance ?? ''}
              handleChange={(e) =>
                setForm((prev) => ({ ...prev, appearance: e.target.value }))
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PreferenceSettings;
