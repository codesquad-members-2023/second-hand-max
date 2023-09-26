import { Category } from 'types/category';
import { create } from 'zustand';

type ImageBundle = {
  id: number;
  imageSrc: string;
  imageFile: File;
};

type PostProductModalStore = {
  imageId: number;
  images: ImageBundle[] | null;
  thumbnailId: number | null;
  title: string;
  price: string;
  content: string;
  selectCategory: Category | null;
  getImageIdAndIncrement: () => number;
  incrementImageId: () => void;
  addImage: (image: Omit<ImageBundle, 'id'>) => void;
  deleteImage: (id: number) => void;
  setThumbnailId: (thumbnailId: number) => void;
  setTitle: (title: string) => void;
  setPrice: (price: string) => void;
  setContent: (content: string) => void;
  setSelectCategory: (category: Category) => void;
  reset: () => void;
};

const initialState = {
  imageId: 0,
  images: null,
  thumbnailId: null,
  title: '',
  price: '',
  content: '',
  selectCategory: null,
};

export const usePostProductModalStore = create<PostProductModalStore>()(
  (set, get) => ({
    ...initialState,
    getImageIdAndIncrement: () => {
      const { imageId, incrementImageId } = get();
      incrementImageId();

      return imageId;
    },
    incrementImageId: () => set(({ imageId }) => ({ imageId: imageId + 1 })),
    addImage: (image) => {
      const { getImageIdAndIncrement } = get();
      const id = getImageIdAndIncrement();

      set(({ images }) =>
        images
          ? {
              images: [...images, { ...image, id }],
            }
          : { images: [{ ...image, id }] },
      );
    },
    deleteImage: (id: number) => {
      set(({ images }) =>
        images
          ? { images: images.filter((image) => image.id !== id) }
          : { images },
      );
    },
    setThumbnailId: (thumbnailId) => set(() => ({ thumbnailId })),
    setTitle: (title) => set(() => ({ title })),
    setPrice: (price) => set(() => ({ price })),
    setContent: (content) => set(() => ({ content })),
    setSelectCategory: (category) => set(() => ({ selectCategory: category })),
    reset: () => set({ ...initialState }),
  }),
);

// 썸네일 자동 지정하기 위한 구독 로직
usePostProductModalStore.subscribe(({ thumbnailId }) => {
  const { images } = usePostProductModalStore.getState();

  if (!images?.[0]) {
    return;
  }

  const isValidThumbnailId = images.some(({ id }) => id === thumbnailId);

  if (thumbnailId === null || !isValidThumbnailId) {
    usePostProductModalStore.setState({
      thumbnailId: images[0].id,
    });
  }
});
