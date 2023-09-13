import ButtonStyle from '@components/Button';
import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

export const AddRegionModalHeader: React.FC<{ onModalClose: () => void }> = ({
  onModalClose,
}) => {
  return (
    <HeaderContainer>
      <Button onClick={onModalClose}>
        <Icons.ChevronLeft />
      </Button>
      <Button onClick={onModalClose}>
        <Icons.XCross />
      </Button>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  ${({ theme: { fonts, colors } }) => css`
    width: 100%;
    padding: 8px 8px 16px 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${fonts.display.strong20};

    stroke: ${colors.neutral.text};
  `}
`;

const Button = styled(ButtonStyle)`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;
