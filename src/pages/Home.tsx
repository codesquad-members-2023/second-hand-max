import Button from '@components/Button';
import { DropdownContainer } from '@components/Dropdown';
import { DropdownIndicator } from '@components/Dropdown/DropdownIndicator';
import {
  DropdownMenuItem,
  StyledDropdownMenuItem,
} from '@components/Dropdown/DropdownMenuItem';
import { DropdownMenus } from '@components/Dropdown/DropdownMenus';
import Fab from '@components/Fab';
import { AddRegionModal } from '@components/Modal/RegionModal/AddRegionModal';
import ProductList from '@components/ProductList';
import TopBar from '@components/TopBar';
import Icons from '@design/Icons';
import { useState } from 'react';
import { useUserStore } from 'stores/useUserStore';
import { css, styled } from 'styled-components';

const Home: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const [isAddRegionOpen, setIsAddRegionOpen] = useState(false);

  const regionMenuOpen = () => setIsRegionMenuOpen(true);
  const regionMenuClose = () => setIsRegionMenuOpen(false);
  const addRegionMenuOpen = () => setIsAddRegionOpen(true);
  const addRegionMenuClose = () => setIsAddRegionOpen(false);

  // addRegion gogo

  return (
    <>
      <Title>
        <DropdownContainer>
          <DropdownIndicator onClick={regionMenuOpen}>
            <DropdownText>{currentRegion.addressName}</DropdownText>
            <Icons.ChevronDown />
          </DropdownIndicator>
          {isRegionMenuOpen && (
            <DropdownMenus onClose={regionMenuClose}>
              <DropdownMenuItem onClick={() => {}}>역삼 1동</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>공릉 2동</DropdownMenuItem>
              <SetRegionButton onClick={addRegionMenuOpen}>
                내 동네 설정하기
              </SetRegionButton>
            </DropdownMenus>
          )}
          {isAddRegionOpen && (
            <AddRegionModal
              {...{ onModalClose: addRegionMenuClose, addRegion: () => {} }}
            />
          )}
        </DropdownContainer>

        <IconWrapper>
          <Icons.LayoutGrid />
        </IconWrapper>
      </Title>
      <Content>
        <ProductList />
        <Fab />
      </Content>
    </>
  );
};

const Title = styled(TopBar)`
  ${({ theme: { fonts, colors } }) => css`
    padding: 8px;
    justify-content: space-between;
    ${fonts.display.strong16};
    z-index: 1;
    background: ${colors.neutral.backgroundBlur};
    backdrop-filter: blur(8px);
    position: absolute;
    top: 0;

    stroke: ${colors.neutral.text};
  `};
`;

const DropdownText = styled.div`
  padding: 0 8px;
`;

const SetRegionButton = styled(StyledDropdownMenuItem)`
  ${({ theme: { fonts } }) => fonts.available.default16};
`;

const IconWrapper = styled(Button)`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 16px;
  padding-top: ${({ theme: { dimensions } }) => dimensions.topBarHeight};
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    padding: 0;
    height: 0;
  }
`;

export default Home;
