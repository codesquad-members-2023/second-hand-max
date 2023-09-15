import { DropdownIndicator } from './DropdownIndicator';
import { DropdownMenus } from './DropdownMenus';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownContainer } from './DropdownContainer';

export const Dropdown = Object.assign(DropdownContainer, {
  Indicator: DropdownIndicator,
  Menus: DropdownMenus,
  MenuItem: DropdownMenuItem,
});
