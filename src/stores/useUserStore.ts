import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { Tokens, User } from 'types';
import { Address } from 'types/region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  tokens: Tokens | null;
  currentRegion: Address;
  setTokens: (tokens: Tokens) => void;
  setUserAuth: ({ user, tokens }: { user: User; tokens: Tokens }) => void;
  setAddAddress: (address: Address) => void;
  setCurrentRegion: (address: Address) => void;
  reset: () => void;
};

const initialState = {
  user: null,
  tokens: null,
  currentRegion: {
    addressId: 1,
    addressName: '역삼 1동',
    fullAddressName: '역삼 1동',
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTokens: (tokens) => set({ tokens }),
      setUserAuth: ({ user, tokens }) => set({ user, tokens }),
      setAddAddress: (address) =>
        set(({ user }) => {
          if (!user) {
            return { user: null };
          }

          return {
            user: {
              ...user,
              addresses: user.addresses
                ? [...user.addresses, address]
                : [address],
            },
          };
        }),
      setCurrentRegion: (address) => set({ currentRegion: address }),
      reset: () => set({ ...initialState }),
    }),
    { name: LOCAL_STORAGE_KEY.USER },
  ),
);
