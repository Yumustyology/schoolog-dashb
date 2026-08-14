import React from 'react';
import SelectComp from './Select';

type WeekSelectProps = {
  label?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  triggerClasses?: string;
  selectClasses?: string;
  labelClassName?: string;
  contentClasses?: string;
};

export default function WeekSelect({
  label = 'Week (optional)',
  value,
  onValueChange,
  triggerClasses,
  selectClasses,
  labelClassName,
  contentClasses,
}: WeekSelectProps) {
  return (
    <SelectComp
      label={label}
      value={value ?? 'none'}
      onValueChange={onValueChange ?? (() => {})}
      options={[
        { id: 'none', name: 'None' },
        ...Array.from({ length: 14 }, (_, i) => ({ id: String(i + 1), name: `Week ${i + 1}` })),
      ]}
      triggerClasses={triggerClasses}
      selectClasses={selectClasses}
      labelClassName={labelClassName}
      contentClasses={contentClasses}
    />
  );
}
