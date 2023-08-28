import TopBar from '@components/TopBar';
import { styled } from 'styled-components';

const SalesHistory: React.FC = () => {
  return (
    <>
      <Title aria-label="판매내역">판매내역</Title>
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

export default SalesHistory;
