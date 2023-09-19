import { ERROR_MESSAGE } from '@constants/ERROR_MESSAGE';
import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { updateAccessToken } from 'apis/auth';
import { Tokens, User } from 'types';
import { Address } from 'types/region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  tokens: Tokens | null;
  currentRegion: Address;
  getTokens: () => Tokens;
  setTokens: (tokens: Tokens) => void;
  handleTokenExpiry: () => Promise<void>;
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
    (set, get) => ({
      ...initialState,
      getTokens: () => {
        const tokens = get().tokens;

        if (!tokens) {
          throw new Error(ERROR_MESSAGE.TOKEN_NOT_FOUND);
        }

        return tokens;
      },
      setTokens: (tokens) => set({ tokens }),
      handleTokenExpiry: async () => {
        try {
          const { getTokens, setTokens } = get();
          const tokens = getTokens();

          const tokenResponse = await updateAccessToken(tokens.refreshToken);
          const isSuccess = tokenResponse.statusCode === 200;

          if (isSuccess) {
            const { accessToken } = tokenResponse.data.jwt;

            setTokens({ ...tokens, accessToken });
          } else {
            throw new Error(ERROR_MESSAGE.TOKEN_REFRESH_FAILED);
          }
        } catch (error) {
          console.error(error);
        }
      },
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
