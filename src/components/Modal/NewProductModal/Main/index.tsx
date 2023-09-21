import styled, { css } from 'styled-components';
import { PictureList } from './PictureList';
import { useUserStore } from 'stores/useUserStore';
import { useState } from 'react';
import { Tag } from '@components/Tag';
import { useCategoryQuery } from '@hooks/queries/useCategoryQuery';
import Icons from '@design/Icons';
import { Title } from './Title';
import { CategoryListModal } from '@components/Modal/CategoryListModal';
import { Category } from 'types/category';
import { useImageFileReader } from '@hooks/useImageFileReader';
import { postProduct } from 'apis/product';

export const Main: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [selectCategory, setSelectCategory] = useState<Category>();
  const [isCategoryListModalOpen, setIsCategoryListModalOpen] = useState(false);
  const { withoutPopularCategories: categories } = useCategoryQuery();

  const [imageSrcList, setImageSrcList] = useState<string[]>();
  const [imageFiles, setImageFiles] = useState<File[]>();
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);

  const onImageLoadSuccess = (result: string, file: File) => {
    setImageSrcList((prev) => (prev ? [...prev, result] : [result]));
    setImageFiles((prev) => (prev ? [...prev, file] : [file]));
  };

  const { onImageChange } = useImageFileReader(onImageLoadSuccess);

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

    postProduct({
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

  const exampleCategories =
    categories && selectCategory
      ? [...new Set([selectCategory, ...categories])]
      : categories;

  return (
    <>
      <Title {...{ onSubmitButtonClick: onSubmitProduct }} />
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

      <StyledMain>
        <PictureList
          {...{ imageSrcList, thumbnailIndex, selectThumbnail, onImageChange }}
        />
        <TitleInput
          placeholder={'제목을 입력하세요.'}
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        {title && (
          <CategoryContainer>
            <Tags>
              {exampleCategories &&
                exampleCategories.slice(0, 3).map((category) => {
                  return (
                    <Tag
                      key={category.id}
                      {...{
                        title: category.name,
                        isSelected: selectCategory?.id === category.id,
                        onClick: () => setSelectCategory(category),
                      }}
                    />
                  );
                })}
            </Tags>
            <Icons.ChevronRight onClick={openCategoryListModalOpen} />
          </CategoryContainer>
        )}
        <PriceInput
          placeholder={'가격(선택사항)'}
          type="number"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
        />
        <ContentInput
          placeholder={`${currentRegion.addressName}에 올릴 게시물을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)`}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </StyledMain>
    </>
  );
};

const StyledMain = styled.div`
  margin: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const TitleInput = styled.input``;

const PriceInput = styled.input``;

const ContentInput = styled.textarea`
  height: 100%;
`;

const Tags = styled.div`
  display: flex;
  gap: 4px;
`;

const CategoryContainer = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & svg {
      stroke: ${colors.neutral.text};
      cursor: pointer;
    }
  `};
`;
