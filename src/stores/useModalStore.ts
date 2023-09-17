import { create } from 'zustand';

type ModalStore = {
  isRegionSettingModalOpen: boolean;
  isCategoryModalOpen: boolean;
  setIsRegionSettingModalOpen: (isOpen: boolean) => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
};

const initialState = {
  isRegionSettingModalOpen: false,
  isCategoryModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  setIsRegionSettingModalOpen: (isOpen) =>
    set(() => ({ isRegionSettingModalOpen: isOpen })),
  openCategoryModal: () => set(() => ({ isCategoryModalOpen: true })),
  closeCategoryModal: () => set(() => ({ isCategoryModalOpen: false })),
}));
