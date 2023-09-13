import { create } from 'zustand';

type ModalStore = {
  isRegionModalOpen: boolean;
  setIsRegionModalOpen: (isOpen: boolean) => void;
};

const initialState = {
  isRegionModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  setIsRegionModalOpen: (isOpen) => set(() => ({ isRegionModalOpen: isOpen })),
}));
