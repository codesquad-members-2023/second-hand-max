import ACCEPTED_EXTENSIONS from '@constants/ACCEPTED_EXTENSIONS';
import Icons from '@design/Icons';
import styled, { css } from 'styled-components';

export const PictureList: React.FC = () => {
  return (
    <FlexContainer>
      <AddButton>
        <input type="file" accept={ACCEPTED_EXTENSIONS.PRODUCT_IMAGE} />
        <Icons.Camera />
        <ImageCounter>0/10</ImageCounter>
      </AddButton>
    </FlexContainer>
  );
};

const FlexContainer = styled.div`
  display: flex;
`;

const AddButton = styled.div`
  ${({ theme: { colors, radius } }) => css`
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.neutral.border};
    border-radius: ${radius.large};
    user-select: none;
    cursor: pointer;
    position: relative;

    stroke: ${colors.neutral.text};

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }
  `};
`;

const ImageCounter = styled.div``;
