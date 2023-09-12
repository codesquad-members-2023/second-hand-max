import { fetchData } from 'apis/fetchData';

export const getRegions = () => {
  return fetchData('/auth/regions');
};
