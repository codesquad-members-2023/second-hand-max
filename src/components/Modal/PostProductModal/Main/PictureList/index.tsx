import ACCEPTED_EXTENSIONS from '@constants/ACCEPTED_EXTENSIONS';
import Icons from '@design/Icons';
import styled, { css } from 'styled-components';
import { PictureItem } from './PictureItem';
import { useDraggable } from '@hooks/useDraggable';

type Props = {
  imageSrcList?: string[];
  thumbnailIndex: number;
  selectThumbnail: (index: number) => void;
  onImageChange: (file: File) => void;
};

export const PictureList: React.FC<Props> = ({
  imageSrcList,
  thumbnailIndex,
  selectThumbnail,
  onImageChange,
}) => {
  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDraggable();

  const onDragSlideEnd = () => {
    onDragEnd();
  };

  return (
    <FlexContainer
      ref={scrollContainerRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragSlideEnd}
    >
      <AddButton>
        <input
          type="file"
          accept={ACCEPTED_EXTENSIONS.PRODUCT_IMAGE}
          onChange={({ target }) => {
            const file = target.files?.[0];

            if (file) {
              onImageChange(file);
            }
          }}
        />
        <Icons.Camera />
        <ImageCounter>{imageSrcList?.length ?? 0}/10</ImageCounter>
      </AddButton>
      {imageSrcList &&
        imageSrcList.map((imageSrc, index) => (
          <PictureItem
            key={imageSrc}
            {...{
              imageSrc,
              isThumbnail: thumbnailIndex === index,
              onClick: () => selectThumbnail(index),
            }}
          />
        ))}
    </FlexContainer>
  );
};

const FlexContainer = styled.div`
  overflow: scroll;
  display: flex;
  gap: 16px;
  flex-shrink: 0;
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
    flex-shrink: 0;

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
