import { create } from 'zustand';

type ModalStore = {
  isRegionSettingModalOpen: boolean;
  isCategoryModalOpen: boolean;
  isPostProductModalOpen: boolean;
  openRegionSettingModal: () => void;
  closeRegionSettingModal: () => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  openPostProductModal: () => void;
  closePostProductModal: () => void;
};

const initialState = {
  isRegionSettingModalOpen: false,
  isCategoryModalOpen: false,
  isPostProductModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  openRegionSettingModal: () => set(() => ({ isRegionSettingModalOpen: true })),
  closeRegionSettingModal: () =>
    set(() => ({ isRegionSettingModalOpen: false })),
  openCategoryModal: () => set(() => ({ isCategoryModalOpen: true })),
  closeCategoryModal: () => set(() => ({ isCategoryModalOpen: false })),
  openPostProductModal: () => set(() => ({ isPostProductModalOpen: true })),
  closePostProductModal: () => set(() => ({ isPostProductModalOpen: false })),
}));
