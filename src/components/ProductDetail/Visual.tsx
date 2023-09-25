import { DraggableImageSlider } from '@components/DraggableImageSlider';
import { ProductDetail } from 'types/product';

const Visual: React.FC<Pick<ProductDetail, 'imageUrls'>> = ({ imageUrls }) => {
  return <DraggableImageSlider imageUrls={imageUrls} />;
};

export default Visual;
