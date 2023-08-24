import { styled } from 'styled-components';

import { ReactComponent as Home } from '@assets/icons/home.svg';
import { ReactComponent as News } from '@assets/icons/news.svg';
import { ReactComponent as Heart } from '@assets/icons/heart.svg';
import { ReactComponent as Message } from '@assets/icons/message.svg';
import { ReactComponent as UserCircle } from '@assets/icons/user-circle.svg';

const TabList: React.FC = () => {


  return (
    <Container>
      <ul>
        <li>
          <button>
            <Home stroke="black"/>
            <span>홈화면</span>
          </button>
        </li>
        <li>
          <button>
            <News />
            <span>판매내역</span>
          </button>
        </li>
        <li>
          <button>
            <Heart />
            <span>관심상품</span>
          </button>
        </li>
        <li>
          <button>
            <Message />
            <span>채팅</span>
          </button>
        </li>
        <li>
          <button>
            <UserCircle />
            <span>내 계정</span>
          </button>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  padding: 0 16px;

  & > ul {
    display: flex;
    justify-content: space-between;

    & > li {
      width: 48px;
      height: 48px;

      & > button {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        ${({ theme: { fonts } }) =>
          fonts.available.strong10}
      }
    }
  }
`;

export default TabList;
