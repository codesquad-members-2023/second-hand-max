import { useContext } from 'react';
import { DropdownContext } from './DropdownContext';

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      'dropdownContext 사용은 DropdownProvider 내에서 사용해야 합니다',
    );
  }

  return context;
};
