import Button from '@components/Button';
import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

export const RegionModalHeader: React.FC<{ onModalClose: () => void }> = ({
  onModalClose,
}) => {
  return (
    <HeaderContainer>
      <h3>동네 설정</h3>
      <CloseButton onClick={onModalClose}>
        <Icons.XCross />
      </CloseButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  ${({ theme: { fonts, colors } }) => css`
    width: 100%;
    padding: 8px 8px 16px 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${fonts.display.strong20};

    stroke: ${colors.neutral.text};
  `}
`;

const CloseButton = styled(Button)`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;
