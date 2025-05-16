// import {
//     Menu,
//     MenuHandler,
//     MenuList,
//     MenuItem,
//     Button,
// } from "@material-tailwind/react";
// import { OptionIcon } from "../../icons/Icons";
// import { cn } from "@/app/lib/utils";
// import { Inter_500 } from "@/app/lib/config/font.config";

// interface MenuItemProps {
//     label: string;
//     onClick: () => void;
//     icon?: React.ReactNode;
// }

// interface DropdownMenuProps {
//     label: string;
//     items: MenuItemProps[];
//     placement?: | "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end";
//     maxHeight?: string;
// }

// const MenuLists: React.FC<DropdownMenuProps> = ({
//     label,
//     items,
//     placement = "bottom",
//     maxHeight = "200px", // Default max height
// }) => {
//     return (
//         <Menu placement={placement}>
//             <MenuHandler>
//                 <div>
//                     <OptionIcon />
//                 </div>
//             </MenuHandler>
//             <MenuList
//                 className="z-50 overflow-y-auto"
//                 style={{ maxHeight }} // Apply dynamic max height
//             >
//                 {items.map((item, index) => (
//                     <MenuItem key={index} onClick={item.onClick} className="flex items-center gap-2">
//                         {item.icon && <span>{item.icon}</span>}
//                         <p className={cn('text-sm text-black1', Inter_500.className)}>
//                             {item.label}
//                         </p>
//                     </MenuItem>
//                 ))}
//             </MenuList>
//         </Menu>
//     );
// };

// export default MenuLists;

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { OptionIcon } from '../../icons/Icons';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean; // New: Marks the item as dangerous (red color)
}

interface DropdownMenuProps {
  label: string;
  items: MenuItemProps[];
  placement?:
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
  maxHeight?: string;
  maxWidth?: string; // New: Controls max width
  icon?: React.ReactNode; // New: Additional icon to display in the menu item (optional)
}

const MenuLists: React.FC<DropdownMenuProps> = ({
  label,
  items,
  placement = 'bottom',
  maxHeight = '200px',
  maxWidth = '200px', // Default max width
  icon = <OptionIcon />,
}) => {
  return (
    <Menu placement={placement}>
      <MenuHandler>
        <div>{icon}</div>
      </MenuHandler>
      <MenuList
        className="z-50 overflow-y-auto p-2"
        style={{ maxHeight, maxWidth }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
            }}
            className={cn(
              'flex items-center gap-4 p-2',
              item.danger ? 'text-red-500' : 'text-black1'
            )}
          >
            {item.icon && <span>{item.icon}</span>}
            <p className={cn('text-sm', Inter_500.className)}>{item.label}</p>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuLists;
