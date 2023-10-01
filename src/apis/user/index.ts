import { fetchDataWithToken } from 'apis/fetchData';
import { useUserStore } from 'stores/useUserStore';
import {
  getUserAddressesResponse,
  updateUserProfileImageResponse,
} from './types';

export const updateUserProfileImage = async (
  file: File,
): Promise<updateUserProfileImageResponse> => {
  const { loginId } = useUserStore.getState().getUser();
  const formData = new FormData();

  if (file) {
    formData.append('updateImageFile', file);
  }

  const response = await fetchDataWithToken(`/members/${loginId}`, {
    method: 'PUT',
    body: formData,
  });

  return response.json();
};

export const getUserAddresses = async (): Promise<getUserAddressesResponse> => {
  const response = await fetchDataWithToken(`/members/regions`);

  return response.json();
};
