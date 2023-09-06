import { UserLocationData } from '../types';
import { fetcher } from './axios';
import { API_ENDPOINT } from './endPoint';

export const getUserLocations = async (): Promise<UserLocationData> => {
  const res = await fetcher.get(API_ENDPOINT.USER_LOCATION);
  return res.data;
};

export const getLocationData = async ({
  pageParam,
  searchParam,
}: {
  pageParam: number;
  searchParam: string;
}) => {
  const res = await fetcher.get(
    `${API_ENDPOINT.LOCATION_DATA}?cursor=${pageParam}&search=${searchParam}`
  );
  return res.data;
};

export const addUserLocation = async (locationName: string) => {
  const res = await fetcher.post(API_ENDPOINT.USER_LOCATION, {
    name: locationName,
  });
  return res.data;
};

export const selectUserLocation = async (locationId: number) => {
  const res = await fetcher.patch(
    `${API_ENDPOINT.USER_LOCATION}/${locationId}`
  );
  return res.data;
};

export const deleteUserLocation = async (locationId: number) => {
  const res = await fetcher.delete(
    `${API_ENDPOINT.USER_LOCATION}/${locationId}`
  );
  return res.data;
};
