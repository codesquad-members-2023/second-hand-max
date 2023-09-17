import { create } from 'zustand';

type SignUpAddressStore = {
  addressIds: number[];
  addAddressId: (id: number) => void;
  deleteAddressId: (id: number) => void;
};

const initialState = {
  addressIds: [],
};

export const useSignUpAddressStore = create<SignUpAddressStore>()((set) => ({
  ...initialState,
  addAddressId: (id) =>
    set(({ addressIds }) => ({ addressIds: [...addressIds, id] })),
  deleteAddressId: (targetId) =>
    set(({ addressIds }) => ({
      addressIds: addressIds.filter((id) => id !== targetId),
    })),
}));
