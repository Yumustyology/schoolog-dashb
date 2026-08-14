'use client';

import Input from '@/components/atoms/form/Input';
import { poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { Label } from '@/components/ui/label';
import DropdownMultiSelect, {
  OptionType,
} from '@/components/atoms/form/DropdownMultiSelect';
import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
import { MultiValue } from 'react-select';
import { useEntity } from 'simpler-state';
import {
  selectedAnnouncementPreference,
  setSelectedAnnoncementPreference,
  announcementFormState,
  updateAnnouncementForm,
} from '@/app/lib/entities/annoucement.entity';
import { AnnouncementMediumDropdown } from '@/components/atoms/dashboard/announcement/AnnoucementMediumDropdown';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';

function Step2() {
  const selectedAnnouncement = useEntity(selectedAnnouncementPreference);
  const form = useEntity(announcementFormState);
  const { classGrades } = useClassGradeFilter({ disableUrlSync: true });

  const options = [
    { value: 'all', label: 'All' },
    { value: 'students', label: 'Students' },
    { value: 'staff', label: 'Staff' },
    { value: 'parents', label: 'Parents' },
  ];

  const classOptions: OptionType[] = classGrades.map((c) => ({
    value: c._id,
    label: c.name,
  }));
  const selectedClassOptions = classOptions.filter((c) =>
    form.classIds.includes(c.value)
  );

  return (
    <div>
      <div className="mb-12 mt-6">
        <p className={cn('text-primary text-xs', poppins_600.className)}>
          Annoucement preference
        </p>
        <h2
          className={cn(
            'text-xl --text-center text-gray1 mt-3',
            poppins_500.className
          )}
        >
          Select announcement audience and end date
        </h2>
      </div>
      <div>
        <RadioOptionType
          options={options}
          selectedOption={selectedAnnouncement}
          setSelectedOption={setSelectedAnnoncementPreference}
        />
      </div>

      <div className="mt-8">
        {selectedAnnouncement === 'students' && (
          <div>
            <Label
              className={cn('text-base text-gray1 mb-2', poppins_400.className)}
            >
              Select Class
            </Label>
            <DropdownMultiSelect
              options={classOptions}
              value={selectedClassOptions}
              onChange={(selected: MultiValue<OptionType>) =>
                updateAnnouncementForm({
                  classIds: selected.map((s) => s.value),
                })
              }
              placeholder="Select classes..."
            />
          </div>
        )}

        <div className="mt-6">
          <AnnouncementMediumDropdown
            value={form.channel}
            onChange={(channel) => updateAnnouncementForm({ channel })}
          />
        </div>

        <Input
          id="expiringDate"
          label="Expires on (Optional)"
          type="date"
          labelClassName="label text-gray2 mt-6"
          className=" h-11 rounded-lg"
          name="expiresAt"
          placeholder="Select date"
          value={form.expiresAt}
          handleChange={(e) =>
            updateAnnouncementForm({ expiresAt: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default Step2;
