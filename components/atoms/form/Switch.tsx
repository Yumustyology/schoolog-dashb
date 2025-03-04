import { cn } from '@/app/lib/utils';
import React from 'react';

interface SwitchProps {
  /** Current state of the switch */
  checked?: boolean;
  /** Callback when switch changes */
  onChange?: (checked: boolean) => void;
  /** Unique identifier */
  id?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Color when switch is on */
  activeColor?: string;
  /** Border Color when switch is on */
  activeBorder?: string;
  /** In active border Color when switch is on */
  inActiveBorder?: string;
  /** Color when switch is off */
  inactiveColor?: string;
  /** Padding for the circle button */
  padding?: number;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange = () => {},
  id = 'switch-component',
  width = 36,
  height = 20,
  disabled = false,
  activeColor = 'bg-slate-800',
  activeBorder = 'border-slate-800',
  inactiveColor = 'bg-slate-100',
  padding = 2,
}) => {
  const handleSize = height - padding * 3.5;
  const translation = width - height + padding;

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div
      className="relative inline-block"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <input
        checked={checked}
        onChange={handleSwitchChange}
        disabled={disabled}
        id={id}
        type="checkbox"
        className={cn(
          'peer appearance-none absolute w-full h-full rounded-full cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50',
          inactiveColor,
          checked && activeColor
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute bg-white rounded-full --shadow-md transition-all duration-300 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          checked && activeBorder
        )}
        style={{
          width: `${handleSize}px`,
          height: `${handleSize}px`,
          top: `${padding}px`,
          left: `${padding}px`,
          transform: checked
            ? `translateX(${translation}px) translateY(1.5px)`
            : 'translateY(1.5px) translateX(1.5px)',
        }}
      />
    </div>
  );
};

export default Switch;
