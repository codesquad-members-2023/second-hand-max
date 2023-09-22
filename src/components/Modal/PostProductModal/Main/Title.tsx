import { BackButton as BackButtonStyle } from '@components/BackButton';
import TopBarStyle from '@components/TopBar';
import { useModalStore } from 'stores/useModalStore';
import styled, { css } from 'styled-components';

type Props = {
  onSubmitButtonClick: () => void;
  canSubmit: boolean;
};

export const Title: React.FC<Props> = ({ onSubmitButtonClick, canSubmit }) => {
  const closePostProductModal = useModalStore(
    ({ closePostProductModal }) => closePostProductModal,
  );

  return (
    <TopBar>
      <BackButton onClick={closePostProductModal}>닫기</BackButton>
      <div>내 물건 팔기</div>
      <SubmitButton onClick={onSubmitButtonClick} disabled={!canSubmit}>
        완료
      </SubmitButton>
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
