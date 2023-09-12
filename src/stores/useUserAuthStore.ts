import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { Tokens, User } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserAuthStore = {
  user: User | null;
  tokens: Tokens | null;
  setUser: (id: User) => void;
  setTokens: (tokens: Tokens) => void;
  setUserAuth: ({ user, tokens }: { user: User; tokens: Tokens }) => void;
  reset: () => void;
};

const initialState = {
  user: null,
  tokens: null,
};

export const useUserAuthStore = create<UserAuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set(() => ({ user })),
      setTokens: (tokens) => set(() => ({ tokens })),
      setUserAuth: ({ user, tokens }) => set(() => ({ user, tokens })),
      reset: () => set(() => ({ ...initialState })),
    }),
    { name: LOCAL_STORAGE_KEY.USER_AUTH },
  ),
);
