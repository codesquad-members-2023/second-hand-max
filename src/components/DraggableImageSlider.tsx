import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  imageUrls: string[];
  description?: string;
};

export const DraggableImageSlider: React.FC<Props> = ({
  imageUrls,
  description,
}) => {
  return (
    <StyledDraggableImageSlider>
      <Swiper modules={[Pagination]} pagination={{ type: 'fraction' }}>
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={`${imageUrl}-${index}`}>
            <SlideImage src={imageUrl} alt={description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledDraggableImageSlider>
  );
};

const StyledDraggableImageSlider = styled.div`
  width: 100%;
  user-select: none;
  cursor: grab;

  .swiper {
    width: 100%;
    height: 100%;

    > .swiper-pagination-fraction {
      width: 59px;
      padding: 8px;
      ${({ theme: { fonts } }) => fonts.display.default12};
      color: ${({ theme: { colors } }) => colors.neutral.textWeak};
      border-radius: 16px;
      background-color: ${({ theme: { colors } }) =>
        colors.neutral.backgroundBlur};

      bottom: 16px;
      left: 300px;
    }
  }

  .swiper-slide {
    width: 100%;
    height: 100%;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 491px;
  object-fit: cover;
`;
