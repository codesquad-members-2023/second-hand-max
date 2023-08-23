import { css, styled } from 'styled-components';

const TopBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <h1 className="blind">헤더</h1>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

const Container = styled.header`
  ${({ theme: { colors } }) => css`
    width: 100%;
    position: absolute;
    border-bottom: 0.8px solid ${colors.neutral.border};
    background: ${colors.neutral.backgroundBlur};
    backdrop-filter: blur(8px);
  `};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  height: 40px;
`;

export default TopBar;
