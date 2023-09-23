import Button from '@components/Button';
import Icons from '@design/Icons';
import styled, { css } from 'styled-components';

type Props = {
  onModalClose: () => void;
};

export const CategoryListModalHeader: React.FC<Props> = ({ onModalClose }) => {
  return (
    <HeaderContainer>
      <h3>카테고리</h3>
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
