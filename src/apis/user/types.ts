import { BaseResponse } from 'apis/types';

export type updateUserProfileImageResponse = BaseResponse & {
  data: {
    profileImageUrl: string;
  };
};

export type getUserAddressesResponse = BaseResponse & {
  data: {
    addresses: {
      addressId: number;
      fullAddressName: string;
      addressName: string;
      isSelected: boolean;
    }[];
  };
};
