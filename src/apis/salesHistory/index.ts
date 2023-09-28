import { fetchDataWithToken } from 'apis/fetchData';
import { ProductStatus, GetSalesHistoryResponse } from './types';

export const getSalesHistory = async (params: {
  status: ProductStatus;
  cursor: number;
}): Promise<GetSalesHistoryResponse> => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (key && value) {
      urlParams.append(key, String(value));
    }
  });

  const response = await fetchDataWithToken(`/sales/history?${urlParams}`);

  return response.json();
};
