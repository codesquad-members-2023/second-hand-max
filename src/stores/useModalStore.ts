import { create } from 'zustand';

type ModalStore = {
  isRegionModalOpen: boolean;
  isAddRegionModalOpen: boolean;
  setIsRegionModalOpen: (isOpen: boolean) => void;
  setIsAddRegionModalOpen: (isOpen: boolean) => void;
};

const initialState = {
  isRegionModalOpen: false,
  isAddRegionModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  setIsRegionModalOpen: (isOpen) => set(() => ({ isRegionModalOpen: isOpen })),
  setIsAddRegionModalOpen: (isOpen) =>
    set(() => ({ isAddRegionModalOpen: isOpen })),
}));
