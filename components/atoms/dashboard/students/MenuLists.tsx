'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { OptionIcon } from '../../icons/Icons';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean; // Marks the item as dangerous (red color)
}

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

interface DropdownMenuProps {
  label: string;
  items: MenuItemProps[];
  placement?: Placement;
  maxHeight?: string;
  maxWidth?: string;
  icon?: React.ReactNode;
}

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'end' | 'center';

/** Maps our Material-Tailwind-style placement strings onto Radix Popover's side/align pair. */
function resolvePlacement(placement: Placement): { side: Side; align: Align } {
  const [rawSide, rawAlign] = placement.split('-');
  const side = (['top', 'right', 'bottom', 'left'] as const).includes(rawSide as Side)
    ? (rawSide as Side)
    : 'bottom';
  const align: Align = rawAlign === 'start' || rawAlign === 'end' ? rawAlign : 'center';
  return { side, align };
}

/**
 * Single shared action-menu trigger used across table rows and info cards.
 * Built on the shadcn/Radix Popover primitive so every "..." action menu in
 * the app shares one popover style instead of a mix of Material Tailwind
 * Menu, ad-hoc dropdowns, etc.
 */
const MenuLists: React.FC<DropdownMenuProps> = ({
  items,
  placement = 'bottom-end',
  maxHeight = '200px',
  maxWidth = '200px',
  icon = <OptionIcon />,
}) => {
  const [open, setOpen] = useState(false);
  const { side, align } = resolvePlacement(placement);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Open actions menu"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center rounded-full p-1 hover:bg-gray4 transition-colors"
        >
          {icon}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={6}
        style={{ maxHeight, maxWidth }}
        className="overflow-y-auto p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={cn(
                'flex items-center gap-4 rounded-md p-2 text-left transition-colors hover:bg-gray4',
                item.danger ? 'text-red-500' : 'text-black1'
              )}
            >
              {item.icon && <span>{item.icon}</span>}
              <span className={cn('text-sm', Inter_500.className)}>{item.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MenuLists;
