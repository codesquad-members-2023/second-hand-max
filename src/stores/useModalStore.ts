import { create } from 'zustand';

type ModalStore = {
  isRegionSettingModalOpen: boolean;
  isCategoryModalOpen: boolean;
  isNewProductModalOpen: boolean;
  openRegionSettingModal: () => void;
  closeRegionSettingModal: () => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  openNewProductModal: () => void;
  closeNewProductModal: () => void;
};

const initialState = {
  isRegionSettingModalOpen: false,
  isCategoryModalOpen: false,
  isNewProductModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  openRegionSettingModal: () => set(() => ({ isRegionSettingModalOpen: true })),
  closeRegionSettingModal: () =>
    set(() => ({ isRegionSettingModalOpen: false })),
  openCategoryModal: () => set(() => ({ isCategoryModalOpen: true })),
  closeCategoryModal: () => set(() => ({ isCategoryModalOpen: false })),
  openNewProductModal: () => set(() => ({ isNewProductModalOpen: true })),
  closeNewProductModal: () => set(() => ({ isNewProductModalOpen: false })),
}));
