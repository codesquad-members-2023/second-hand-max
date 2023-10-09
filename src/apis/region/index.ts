import { fetchData, fetchDataWithToken } from 'apis/fetchData';
import { GetRegionsResponse } from './types';
import { getQueryString } from '@utils/getQueryString';

export const getRegions = async (params: {
  region: string;
  cursor: number;
}): Promise<GetRegionsResponse> => {
  const queryString = getQueryString(params);
  const response = await fetchData(`/regions?${queryString}`);

  return response.json();
};

export const deleteRegion = async (addressId: number) => {
  const response = await fetchDataWithToken(`/regions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      addressId,
    }),
  });

  return response.json();
};

export const addRegion = async (addressId: number) => {
  const response = await fetchDataWithToken(`/regions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      addressId,
    }),
  });

  return response.json();
};

export const selectRegion = async (selectedAddressId: number) => {
  const response = await fetchDataWithToken(`/regions`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selectedAddressId,
    }),
  });

  return response.json();
};
