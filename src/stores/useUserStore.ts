import { ERROR_MESSAGE } from '@constants/ERROR_MESSAGE';
import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import PATH from '@constants/PATH';
import { updateAccessToken } from 'apis/auth';
import { Tokens, User } from 'types';
import { Address } from 'types/region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  tokens: Tokens | null;
  currentRegion: Address;
  getUser: () => User;
  setUserProfileUrl: (profileUrl: string) => void;
  addUserAddress: (address: Address) => void;
  deleteUserAddress: (addressId: Address['addressId']) => void;
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
    addressName: '역삼1동',
    fullAddressName: '서울특별시 강남구 역삼1동',
    isSelected: true,
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      getUser: () => {
        const user = get().user;

        if (!user) {
          throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
        }

        return user;
      },

      setUserProfileUrl: (profileUrl) =>
        set((prevState) => {
          if (!prevState.user) {
            console.error(ERROR_MESSAGE.USER_NOT_FOUND);
            return { ...prevState };
          }

          return {
            ...prevState,
            user: {
              ...prevState.user,
              profileUrl,
            },
          };
        }),

      addUserAddress: (address) =>
        set((prevState) => {
          if (!prevState.user) {
            console.error(ERROR_MESSAGE.USER_NOT_FOUND);
            return { ...prevState };
          }

          return {
            ...prevState,
            user: {
              ...prevState.user,
              addresses: prevState.user.addresses
                ? [...prevState.user.addresses, address]
                : [address],
            },
          };
        }),

      deleteUserAddress: (addressId) =>
        set((prevState) => {
          if (!prevState.user) {
            console.error(ERROR_MESSAGE.USER_NOT_FOUND);
            return { ...prevState };
          }

          if (prevState.user.addresses.length === 1) {
            alert('동네는 최소 1개는 설정해야 합니다.');
            return { ...prevState };
          }

          return {
            ...prevState,
            user: {
              ...prevState.user,
              addresses: prevState.user.addresses.filter(
                (address) => address.addressId !== addressId,
              ),
            },
          };
        }),

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
          get().reset();
          alert('로그인 정보가 만료됐습니다. 다시 로그인하여 주시기 바랍니다.');
          location.href = PATH.MY_ACCOUNT;
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
