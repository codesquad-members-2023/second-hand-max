import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { User } from 'apis/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  user: User | null;
  setUser: (id: User) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
    }),
    { name: LOCAL_STORAGE_KEY.USER },
  ),
);
