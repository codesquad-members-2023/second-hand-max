import Icons from '@design/Icons';
import styled, { css } from 'styled-components';

type Props = {
  imageSrc: string;
  isThumbnail: boolean;
  onClick: () => void;
  onDeleteButtonClick: () => void;
};

export const PictureItem: React.FC<Props> = ({
  imageSrc,
  isThumbnail,
  onClick,
  onDeleteButtonClick,
}) => {
  return (
    <StyledPictureItem>
      <Picture src={imageSrc} onClick={onClick} />
      <Icons.XCross onClick={onDeleteButtonClick} />
      {isThumbnail && <ThumbnailLabel>대표 사진</ThumbnailLabel>}
    </StyledPictureItem>
  );
};

const StyledPictureItem = styled.div`
  ${({ theme: { colors, radius } }) => css`
    width: 80px;
    height: 80px;
    border: 1px solid ${colors.neutral.border};
    border-radius: ${radius.large};
    user-select: none;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    cursor: pointer;

    svg {
      width: 15px;
      height: 15px;
      stroke: ${colors.neutral.text};
      background-color: ${colors.neutral.backgroundWeak};
      border-radius: ${radius.half};
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;

      &:hover {
        background-color: ${colors.neutral.backgroundWeak};
      }
    }
  `};
`;

const Picture = styled.img`
  width: 100%;
  height: 100%;
`;

const ThumbnailLabel = styled.div`
  ${({ theme: { colors, fonts } }) => css`
    width: 100%;
    height: 24px;
    background-color: ${colors.neutral.overlay};
    position: absolute;
    bottom: 0;
    color: ${colors.neutral.background};
    ${fonts.display.default12};
    display: flex;
    align-items: center;
    justify-content: center;
  `};
`;
