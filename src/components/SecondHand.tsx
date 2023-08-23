import { Outlet } from 'react-router-dom';
import { css, styled } from 'styled-components';

const SecondHand: React.FC = () => {
  return (
    <Container>
      <Inner>
        <header></header>
        <main>
          <Outlet />
          <nav>
            <ul>
              <li>홈화면</li>
              <li>판매내역</li>
              <li>관심상품</li>
              <li>채팅</li>
              <li>내 계정</li>
            </ul>
          </nav>
        </main>
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme: { radius, colors } }) => css`
    width: 393px;
    height: 912px;
    max-height: 100vh;
    border-radius: ${radius.large};
    padding: 0 ${radius.medium};
    padding-top: calc(${radius.large} * 2);
    padding-bottom: calc(${radius.large} * 3);
    background-color: ${colors.neutral.textWeak};
  `};
`;

const Inner = styled.div`
  background-color: white;
  height: 100%;
`;

export default SecondHand;
