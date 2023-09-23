import TopBarStyle from '@components/TopBar';
import { css, styled } from 'styled-components';
import { RegionDropdown } from './RegionDropdown';
import { CategoryButton } from './CategoryButton';
import { Dropdown } from '@components/Dropdown';

export const TopBar: React.FC = () => {
  return (
    <StyledTopBar>
      <Dropdown>
        <RegionDropdown />
      </Dropdown>
      <CategoryButton />
    </StyledTopBar>
  );
};

const StyledTopBar = styled(TopBarStyle)`
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
