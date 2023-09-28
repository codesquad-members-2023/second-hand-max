import { Tag } from '@components/Tag';
import { ProductStatus } from 'apis/salesHistory/types';
import styled from 'styled-components';

type Props = {
  statusFilter: ProductStatus;
  onStatusFilterSelect: (status: ProductStatus) => void;
};

export const StatusTabs: React.FC<Props> = ({
  statusFilter,
  onStatusFilterSelect,
}) => {
  return (
    <Tabs>
      <Tag
        title={'전체'}
        isSelected={statusFilter === 'all'}
        onClick={() => onStatusFilterSelect('all')}
      />
      <Tag
        title={'판매중'}
        isSelected={statusFilter === 'on_sale'}
        onClick={() => onStatusFilterSelect('on_sale')}
      />
      <Tag
        title={'판매완료'}
        isSelected={statusFilter === 'sold_out'}
        onClick={() => onStatusFilterSelect('sold_out')}
      />
    </Tabs>
  );
};

const Tabs = styled.div`
  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  gap: 4px;
`;
