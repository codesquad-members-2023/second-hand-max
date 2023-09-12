import { create } from 'zustand';

type ModalStore = {
  isRegionModalOpen: boolean;
  regionModalOpen: () => void;
  regionModalClose: () => void;
};

const initialState = {
  isRegionModalOpen: false,
};

export const useModalStore = create<ModalStore>()((set) => ({
  ...initialState,
  regionModalOpen: () => set(() => ({ isRegionModalOpen: true })),
  regionModalClose: () => set(() => ({ isRegionModalOpen: false })),
}));
