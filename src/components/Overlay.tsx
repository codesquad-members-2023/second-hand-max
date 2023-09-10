import { css, styled } from 'styled-components';

const Overlay: React.FC = () => {
  return <Container></Container>;
};

const Container = styled.button`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background-color: ${colors.neutral.overlay};
    opacity: 0.2;
  `}
`;

export default Overlay;
