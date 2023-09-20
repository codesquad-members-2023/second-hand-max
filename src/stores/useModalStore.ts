import { create } from 'zustand';

type ModalStore = {
  isRegionSettingModalOpen: boolean;
  isCategoryModalOpen: boolean;
  openRegionSettingModal: () => void;
  closeRegionSettingModal: () => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
};

const initialState = {
  isRegionSettingModalOpen: false,
  isCategoryModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  openRegionSettingModal: () => set(() => ({ isRegionSettingModalOpen: true })),
  closeRegionSettingModal: () =>
    set(() => ({ isRegionSettingModalOpen: false })),
  openCategoryModal: () => set(() => ({ isCategoryModalOpen: true })),
  closeCategoryModal: () => set(() => ({ isCategoryModalOpen: false })),
}));
