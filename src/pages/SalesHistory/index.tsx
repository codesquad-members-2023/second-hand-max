import TopBar from '@components/TopBar';
import { styled } from 'styled-components';
import { StatusTabs } from './StatusTabs';
import { useSalesHistoryInfiniteQuery } from '@hooks/queries/useSalesHistoryInfiniteQuery';
import { useState } from 'react';
import { ProductStatus } from 'apis/salesHistory/types';
import { ProductList } from '@components/ProductList';

export const SalesHistory: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<ProductStatus>('all');
  const salesHistoryQueryResult = useSalesHistoryInfiniteQuery(statusFilter);

  const onStatusFilterSelect = (status: ProductStatus) => {
    setStatusFilter(status);
  };

  return (
    <>
      <Title aria-label="판매내역">판매내역</Title>

      <StatusTabs
        statusFilter={statusFilter}
        onStatusFilterSelect={onStatusFilterSelect}
      />

      <ProductList queryResult={salesHistoryQueryResult} />
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  margin-bottom: 16px;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;
