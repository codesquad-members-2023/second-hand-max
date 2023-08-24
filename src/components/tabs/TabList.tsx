import { css, styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Home } from '@assets/icons/home.svg';
import { ReactComponent as News } from '@assets/icons/news.svg';
import { ReactComponent as Heart } from '@assets/icons/heart.svg';
import { ReactComponent as Message } from '@assets/icons/message.svg';
import { ReactComponent as UserCircle } from '@assets/icons/user-circle.svg';
import PATH from '@constants/PATH';

const TabList: React.FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <NavLink to={PATH.BASE}>
            <Home />
            <span>홈화면</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={PATH.SALES_HISTORY}>
            <News />
            <span>판매내역</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={PATH.WISHLIST}>
            <Heart />
            <span>관심상품</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={PATH.CHATTING}>
            <Message />
            <span>채팅</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={PATH.MY_ACCOUNT}>
            <UserCircle />
            <span>내 계정</span>
          </NavLink>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  padding: 0 16px;
  user-select: none;

  & > ul {
    display: flex;
    justify-content: space-between;

    & > li {
      width: 48px;
      height: 48px;

      & > a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        ${({ theme: { fonts, colors } }) => css`
          ${fonts.available.strong10}

          color:  ${colors.neutral.textWeak};
          stroke: ${colors.neutral.textWeak};

          &.active {
            pointer-events: none;
            color: ${colors.neutral.textStrong};
            stroke: ${colors.neutral.textStrong};
          }
        `}
      }
    }
  }
`;

export default TabList;
