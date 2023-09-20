import { BackButton } from '@components/BackButton';
import TopBar from '@components/TopBar';
import { useModalStore } from 'stores/useModalStore';
import { css, styled } from 'styled-components';

export const Header: React.FC = () => {
  const closeCategoryModal = useModalStore(
    ({ closeCategoryModal }) => closeCategoryModal,
  );

  return (
    <Container>
      <BackButton onClick={closeCategoryModal} />
      <span>카테고리</span>
    </Container>
  );
};

const Container = styled(TopBar)`
  ${({ theme: { fonts, colors } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 56px;
    flex-shrink: 0;
    ${fonts.display.strong16}
    stroke: ${colors.neutral.text};
  `}
`;
