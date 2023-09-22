import { FullScreenModalSheet } from '../FullScreenModalSheet';
import { EditBar } from './EditBar';
import { useUserStore } from 'stores/useUserStore';
import { useState } from 'react';
import { useCategoryQuery } from '@hooks/queries/useCategoryQuery';
import { usePostProductMutation } from '@hooks/queries/usePostProductMutation';
import { useImageFileReader } from '@hooks/useImageFileReader';
import { Title } from './Title';
import { CategoryListModal } from '../CategoryListModal';
import { Category } from 'types/category';
import { Inputs } from './Inputs';

const THUMBNAIL_INITIAL_INDEX = 0;

export const PostProductModal: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [selectCategory, setSelectCategory] = useState<Category>();
  const [isCategoryListModalOpen, setIsCategoryListModalOpen] = useState(false);
  const { withoutPopularCategories: categories } = useCategoryQuery();

  const [imageSrcList, setImageSrcList] = useState<string[]>();
  const [imageFiles, setImageFiles] = useState<File[]>();
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(
    THUMBNAIL_INITIAL_INDEX,
  );

  const { mutate: postProductMutate } = usePostProductMutation();

  const onImageLoadSuccess = (result: string, file: File) => {
    setImageSrcList((prev) => (prev ? [...prev, result] : [result]));
    setImageFiles((prev) => (prev ? [...prev, file] : [file]));
  };

  const { onImageChange } = useImageFileReader(onImageLoadSuccess);

  const deleteImageFile = (index: number) => {
    setImageSrcList(
      (prev) => prev?.filter((_, filterIndex) => filterIndex !== index),
    );
    setImageFiles(
      (prev) => prev?.filter((_, filterIndex) => filterIndex !== index),
    );

    if (thumbnailIndex === index) {
      setThumbnailIndex(THUMBNAIL_INITIAL_INDEX);
    }
  };

  const selectThumbnail = (index: number) => {
    setThumbnailIndex(index);
  };

  const openCategoryListModalOpen = () => setIsCategoryListModalOpen(true);
  const closeCategoryListModalOpen = () => setIsCategoryListModalOpen(false);

  const onSubmitProduct = () => {
    const thumbnailImage = imageFiles![thumbnailIndex]!;
    const imagesWithoutThumbnail = imageFiles?.filter(
      (_, index) => index !== thumbnailIndex,
    );

    postProductMutate({
      thumbnailImage,
      images: imagesWithoutThumbnail,
      title,
      price: Number(price),
      content,
      region: currentRegion.addressName,
      status: '판매중',
      categoryId: selectCategory!.id,
      categoryName: selectCategory!.name,
    });
  };

  const canSubmit = !!(
    title &&
    selectCategory?.id &&
    imageFiles?.[thumbnailIndex]
  );

  const exampleCategories =
    categories && selectCategory
      ? [...new Set([selectCategory, ...categories])]
      : categories;

  return (
    <FullScreenModalSheet>
      <Title {...{ onSubmitButtonClick: onSubmitProduct, canSubmit }} />
      {isCategoryListModalOpen && (
        <CategoryListModal
          {...{
            closeCategoryListModalOpen,
            categoryListSelect: (category: Category) => {
              setSelectCategory(category);
              closeCategoryListModalOpen();
            },
          }}
        />
      )}

      <Inputs
        {...{
          imageSrcList,
          thumbnailIndex,
          exampleCategories,
          selectCategoryId: selectCategory?.id,
          title,
          price,
          content,
          currentRegionAddressName: currentRegion.addressName,
          selectThumbnail,
          onImageChange,
          onDeleteButtonClick: deleteImageFile,
          onTagClick: setSelectCategory,
          openCategoryListModalOpen,
          onTitleChange: setTitle,
          onPriceChange: setPrice,
          onContentChange: setContent,
        }}
      />

      <EditBar />
    </FullScreenModalSheet>
  );
};
