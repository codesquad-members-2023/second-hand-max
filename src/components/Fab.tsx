import Icons from '@design/Icons';
import { css, styled } from 'styled-components';
import Button from './Button';

type Props = {
  onClick: () => void;
};

const Fab: React.FC<Props> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Icons.Plus />
    </Container>
  );
};

const Container = styled(Button)`
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
