import Button from '@components/Button';
import Icons from '@design/Icons';
import { useModalStore } from 'stores/useModalStore';
import styled from 'styled-components';

export const CategoryButton: React.FC = () => {
  const openCategoryModal = useModalStore(
    ({ openCategoryModal }) => openCategoryModal,
  );

  return (
    <StyledCategoryButton onClick={openCategoryModal}>
      <Icons.LayoutGrid />
    </StyledCategoryButton>
  );
};

const StyledCategoryButton = styled(Button)`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
