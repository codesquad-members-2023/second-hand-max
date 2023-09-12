import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { Tokens } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TokenState = {
  tokens: Tokens | null;
  setTokens: (tokens: Tokens) => void;
  reset: () => void;
};

const initialState = {
  tokens: null,
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      ...initialState,
      setTokens: (tokens) => set(() => ({ tokens })),
      reset: () => set(() => ({ ...initialState })),
    }),
    { name: LOCAL_STORAGE_KEY.TOKENS },
  ),
);
