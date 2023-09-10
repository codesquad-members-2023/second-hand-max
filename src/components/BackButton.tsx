import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

const BackButton: React.FC = () => {
  return (
    <Container>
      <Icons.ChevronLeft />
      <span>뒤로</span>
    </Container>
  );
};

const Container = styled.button`
  ${({ theme: { fonts, colors } }) => css`
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px;
    ${fonts.available.strong16}
    color: ${colors.neutral.text};
    stroke: ${colors.neutral.text};
  `}
`;

export default BackButton;
