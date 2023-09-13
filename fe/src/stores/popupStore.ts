import { create } from 'zustand';

type AlertOpenType = {
  source?: string | null;
};

type TogglePopupType = {
  type: PopupType;
  open?: boolean;
  source?: string | null;
};

type PopupState = {
  isOpen: {
    modal: boolean | undefined;
    alert: AlertOpenType;
  };
  currentDim: PopupType | null;
  togglePopup: (args: TogglePopupType) => void;
  setCurrentDim: (type: PopupType | null) => void;
};

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: {
    modal: false,
    alert: {
      source: null,
    },
  },
  currentDim: null,
  togglePopup: ({ type, open, source }) =>
    set((state) => {
      console.log(type, open, source, '확인중');

      if (type === 'alert') {
        return {
          isOpen: { ...state.isOpen, [type]: { source: source } },
        };
      }
      return {
        isOpen: { ...state.isOpen, [type]: open },
      };
    }),
  setCurrentDim: (type) => set({ currentDim: type }),
}));
