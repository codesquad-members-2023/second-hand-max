import Button from '@components/Button';
import Icons from '@design/Icons';
import { useModalStore } from 'stores/useModalStore';

import styled from 'styled-components';

export const CategoryButton: React.FC = () => {
  const openCategoryModal = useModalStore(
    ({ openCategoryModal }) => openCategoryModal,
  );

  return (
    <IconWrapper onClick={openCategoryModal}>
      <Icons.LayoutGrid />
    </IconWrapper>
  );
};

const IconWrapper = styled(Button)`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
