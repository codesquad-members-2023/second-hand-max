import Button from '@components/Button';
import Icons from '@design/Icons';
import styled from 'styled-components';

export const CategoryButton: React.FC = () => {
  return (
    <IconWrapper>
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
