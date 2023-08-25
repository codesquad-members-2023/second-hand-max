import TopBar from '@components/TopBar';
import { styled } from 'styled-components';

const Wishlist: React.FC = () => {
  return (
    <>
      <Title aria-label="관심상품">관심상품</Title>
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

export default Wishlist;
