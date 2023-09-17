import BackButton from '@components/BackButton';
import { css, styled } from 'styled-components';

const Header: React.FC = () => {
  return (
    <Container>
      <BackButton />
      <Title>카테고리</Title>
    </Container>
  );
};

const Container = styled.h2`
  ${({ theme: { fonts, colors } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 56px;
    ${fonts.display.strong20}
    stroke: ${colors.neutral.text};
  `}
`;

const Title = styled.span``;

export default Header;
