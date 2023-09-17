import { create } from 'zustand';

type ModalStore = {
  isRegionSettingModalOpen: boolean;
  setIsRegionSettingModalOpen: (isOpen: boolean) => void;
};

const initialState = {
  isRegionSettingModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  setIsRegionSettingModalOpen: (isOpen) =>
    set(() => ({ isRegionSettingModalOpen: isOpen })),
}));
