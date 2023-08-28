import { styled } from 'styled-components';

import PATH from '@constants/PATH';
import Icon from '@design/Icon';
import Tab from './Tab';

const TabList: React.FC = () => {
  return (
    <Container>
      <ul>
        {tabs.map(({ id, ...tabProps }) => (
          <li key={id}>
            <Tab {...tabProps} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

const tabs = [
  {
    id: 1,
    path: PATH.BASE,
    icon: Icon.Home,
    text: '홈화면',
  },
  {
    id: 2,
    path: PATH.SALES_HISTORY,
    icon: Icon.News,
    text: '판매내역',
  },
  {
    id: 3,
    path: PATH.WISHLIST,
    icon: Icon.Heart,
    text: '관심상품',
  },
  {
    id: 4,
    path: PATH.CHATTING,
    icon: Icon.Message,
    text: '채팅',
  },
  {
    id: 5,
    path: PATH.MY_ACCOUNT,
    icon: Icon.UserCircle,
    text: '내계정',
  },
];

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
    }
  }
`;

export default TabList;
