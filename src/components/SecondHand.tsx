import { css, styled } from 'styled-components';
import Tabs from './Tabs/index';
import { ModalOutlet } from './Modal';
import { useEffect, useRef, useState } from 'react';

const SecondHand: React.FC = () => {
  const viewBoxRef = useRef<HTMLDivElement | null>(null);
  const [viewBox, setViewBox] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setViewBox(viewBoxRef.current);
  }, []);

  return (
    <ViewBox ref={viewBoxRef}>
      <Tabs />
      <ModalOutlet parentElement={viewBox} />
    </ViewBox>
  );
};

const ViewBox = styled.div`
  ${({ theme: { colors } }) => css`
    width: 393px;
    height: 852px;
    background-color: ${colors.neutral.background};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
    position: relative;
  `};
`;

export default SecondHand;
