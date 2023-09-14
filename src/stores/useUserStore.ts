import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { Tokens, User } from 'types';
import { Address } from 'types/region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  tokens: Tokens | null;
  regions: Address[] | null;
  currentRegion: Address;
  setUser: (id: User) => void;
  setTokens: (tokens: Tokens) => void;
  setUserAuth: ({ user, tokens }: { user: User; tokens: Tokens }) => void;
  setRegions: (address: Address) => void;
  setCurrentRegion: (address: Address) => void;
  reset: () => void;
};

const initialState = {
  user: null,
  tokens: null,
  regions: null,
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
      setUser: (user) => set(() => ({ user })),
      setTokens: (tokens) => set(() => ({ tokens })),
      setUserAuth: ({ user, tokens }) => set(() => ({ user, tokens })),
      setRegions: (address) =>
        set(({ regions }) => ({
          regions: regions ? [...regions, address] : [address],
        })),
      setCurrentRegion: (address) => set(() => ({ currentRegion: address })),
      reset: () => set(() => ({ ...initialState })),
    }),
    { name: LOCAL_STORAGE_KEY.USER },
  ),
);
