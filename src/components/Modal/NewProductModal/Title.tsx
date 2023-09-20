import { BackButton as BackButtonStyle } from '@components/BackButton';
import TopBarStyle from '@components/TopBar';
import { useModalStore } from 'stores/useModalStore';
import styled, { css } from 'styled-components';

export const Title: React.FC = () => {
  const closeNewProductModal = useModalStore(
    ({ closeNewProductModal }) => closeNewProductModal,
  );

  return (
    <TopBar>
      <BackButton onClick={closeNewProductModal}>닫기</BackButton>
      <div>내 물건 팔기</div>
      <SubmitButton>완료</SubmitButton>
    </TopBar>
  );
};

const TopBar = styled(TopBarStyle)`
  ${({ theme: { fonts } }) => css`
    justify-content: space-between;
    ${fonts.available.strong16};
    padding: 8px;
  `};
`;

const BackButton = styled(BackButtonStyle)`
  position: static;
`;

const SubmitButton = styled(BackButtonStyle)`
  ${({ theme: { fonts } }) => css`
    ${fonts.available.strong16};
    position: static;
  `};
`;
