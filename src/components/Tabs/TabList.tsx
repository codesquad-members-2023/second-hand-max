import { styled } from 'styled-components';

import PATH from '@constants/PATH';
import Icons from '@design/Icons';
import Tab from './Tab';

const TabList: React.FC = () => {
  return (
    <TabsNav>
      <Tabs>
        {tabs.map(({ id, ...tabProps }) => (
          <ListItem key={id}>
            <Tab {...tabProps} />
          </ListItem>
        ))}
      </Tabs>
    </TabsNav>
  );
};

const tabs = [
  {
    id: 1,
    path: PATH.BASE,
    icon: Icons.Home,
    text: '홈화면',
  },
  {
    id: 2,
    path: PATH.SALES_HISTORY,
    icon: Icons.News,
    text: '판매내역',
  },
  {
    id: 3,
    path: PATH.WISHLIST,
    icon: Icons.Heart,
    text: '관심상품',
  },
  {
    id: 4,
    path: PATH.CHATTING,
    icon: Icons.Message,
    text: '채팅',
  },
  {
    id: 5,
    path: PATH.MY_ACCOUNT,
    icon: Icons.UserCircle,
    text: '내계정',
  },
];

const TabsNav = styled.nav`
  width: 100%;
  padding: 0 16px;
  user-select: none;
`;

const Tabs = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const ListItem = styled.li`
  width: 48px;
  height: 48px;
`;

export default TabList;
