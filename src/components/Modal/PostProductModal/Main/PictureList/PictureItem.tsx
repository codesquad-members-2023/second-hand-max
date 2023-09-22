import styled, { css } from 'styled-components';

type Props = {
  imageSrc: string;
  isThumbnail: boolean;
  onClick: () => void;
};

export const PictureItem: React.FC<Props> = ({
  imageSrc,
  isThumbnail,
  onClick,
}) => {
  return (
    <StyledPictureItem onClick={onClick}>
      <Picture src={imageSrc} />
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
