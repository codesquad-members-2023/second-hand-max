import { css, styled } from 'styled-components';
import Tabs from './Tabs/index';
import Detail from './Detail';

const SecondHand: React.FC = () => {
  return (
    <ViewBox>
      <Tabs />
      <Detail />
    </ViewBox>
  );
};

const ViewBox = styled.div`
  ${({ theme: { colors } }) => css`
    min-width: 393px;
    height: 852px;
    background-color: ${colors.neutral.background};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
    position: relative;
  `};
`;

export default SecondHand;
