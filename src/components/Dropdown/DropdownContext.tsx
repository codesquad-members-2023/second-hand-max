import { createContext, useState } from 'react';

export const DropdownContext = createContext<{
  isDropdownOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
} | null>(null);

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <DropdownContext.Provider
      value={{ isDropdownOpen, openDropdown, closeDropdown }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
