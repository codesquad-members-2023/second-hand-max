import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import BottomBar from '@components/BottomBar';
import Panel from '@components/Tabs/Panel';
import TabList from '@components/Tabs/TabList';

const Tabs: React.FC = () => {
  return (
    <Container>
      <Panel>
        <Outlet />
      </Panel>
      <BottomBar>
        <TabList />
      </BottomBar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export default Tabs;
