import { BaseResponse } from 'apis/types';

export type updateUserProfileImageResponse = BaseResponse & {
  data: {
    profileImageUrl: string;
  };
};
