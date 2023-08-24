import { styled } from 'styled-components';

import BottomBar from "@components/BottomBar";
import Panel from './Panel';
import { Outlet } from "react-router-dom";
import TabList from "./TabList";

const Tabs: React.FC = () => {
  return <Container>
    <Panel>
      <Outlet />
    </Panel>
    <BottomBar>
      <TabList />
    </BottomBar>
  </Container>
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`


export default Tabs;