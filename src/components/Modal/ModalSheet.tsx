import { css, styled } from 'styled-components';

type Props = {
  children: React.ReactNode;
  onModalClose?: () => void;
  modalSheetStyle?: React.CSSProperties;
};

export const Modal: React.FC<Props> = ({
  children,
  onModalClose,
  modalSheetStyle,
}) => {
  return (
    <StyledModal>
      <ModalSheet style={modalSheetStyle}>{children}</ModalSheet>
      <Overlay onClick={onModalClose} />
    </StyledModal>
  );
};

const StyledModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  user-select: none;
`;

const Overlay = styled.button`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    background-color: ${colors.neutral.overlay};
    position: absolute;
  `}
`;

const ModalSheet = styled.div`
  ${({ theme: { colors, radius } }) => css`
    width: 300px;
    height: 700px;
    background-color: ${colors.neutral.background};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: ${radius.large};
    z-index: 4;
    box-sizing: border-box;
  `}
`;
