import { fetchDataWithToken } from 'apis/fetchData';
import { useUserStore } from 'stores/useUserStore';
import { updateUserProfileImageResponse } from './types';

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
