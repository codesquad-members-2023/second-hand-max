import { css, styled } from 'styled-components';
import Tabs from './Tabs/index';
import { ModalOutlet } from './Modal';
import { useRef } from 'react';

const SecondHand: React.FC = () => {
  const viewBoxRef = useRef<HTMLDivElement | null>(null);

  return (
    <ViewBox ref={viewBoxRef}>
      <Tabs />
      <ModalOutlet parentElement={viewBoxRef.current} />
    </ViewBox>
  );
};

const ViewBox = styled.div`
  ${({ theme: { colors, radius } }) => css`
    width: 393px;
    height: 852px;
    background-color: ${colors.neutral.background};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
    border-radius: ${radius.large};
    overflow: hidden;
    position: relative;
  `};
`;

export default SecondHand;
