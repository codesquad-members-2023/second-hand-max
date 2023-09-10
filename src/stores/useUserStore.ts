import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { User } from 'apis/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  user: User | null;
  setUser: (id: User) => void;
  reset: () => void;
};

const initialState = {
  user: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set(() => ({ user })),
      reset: () => set(() => ({ ...initialState })),
    }),
    { name: LOCAL_STORAGE_KEY.USER },
  ),
);
