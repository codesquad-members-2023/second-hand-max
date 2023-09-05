import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

const Fab: React.FC = () => {
  return (
    <Container>
      <Icons.Plus />
    </Container>
  );
};

const Container = styled.button`
  ${({ theme: { colors, radius } }) => css`
    height: 56px;
    width: 56px;
    position: absolute;
    bottom: 88px;
    right: 24px;
    border-radius: ${radius.half};

    display: flex;
    align-items: center;
    justify-content: center;
    stroke: ${colors.accent.text};
    background-color: ${colors.accent.primary};
  `}
`;

export default Fab;
