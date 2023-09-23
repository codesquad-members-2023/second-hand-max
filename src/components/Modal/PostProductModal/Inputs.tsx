import styled, { css } from 'styled-components';
import { PictureList } from './PictureList';
import Icons from '@design/Icons';
import { Category } from 'types/category';
import { Tag } from '@components/Tag';

type Props = {
  imageSrcList?: string[];
  thumbnailIndex: number;
  exampleCategories?: Category[];
  selectCategoryId?: number;
  title: string;
  price: string;
  content: string;
  currentRegionAddressName: string;
  selectThumbnail: (index: number) => void;
  onImageChange: (file: File) => void;
  onDeleteButtonClick: (index: number) => void;
  onTagClick: (category: Category) => void;
  openCategoryListModalOpen: () => void;
  onTitleChange: (title: string) => void;
  onPriceChange: (price: string) => void;
  onContentChange: (content: string) => void;
};

const EXAMPLE_CATEGORY_MAX_COUNT = 3;

export const Inputs: React.FC<Props> = ({
  imageSrcList,
  thumbnailIndex,
  exampleCategories,
  selectCategoryId,
  title,
  price,
  content,
  currentRegionAddressName,
  selectThumbnail,
  onImageChange,
  onDeleteButtonClick,
  onTagClick,
  openCategoryListModalOpen,
  onTitleChange,
  onPriceChange,
  onContentChange,
}) => {
  return (
    <StyledMain>
      <PictureList
        {...{
          imageSrcList,
          thumbnailIndex,
          selectThumbnail,
          onImageChange,
          onDeleteButtonClick,
        }}
      />
      <TitleInput
        placeholder={'제목을 입력하세요.'}
        value={title}
        onChange={({ target }) => onTitleChange(target.value)}
      />
      {title && (
        <CategoryContainer>
          <Tags>
            {exampleCategories &&
              exampleCategories
                .slice(0, EXAMPLE_CATEGORY_MAX_COUNT)
                .map((category) => (
                  <Tag
                    key={category.id}
                    {...{
                      title: category.name,
                      isSelected: selectCategoryId === category.id,
                      onClick: () => onTagClick(category),
                    }}
                  />
                ))}
          </Tags>
          <Icons.ChevronRight onClick={openCategoryListModalOpen} />
        </CategoryContainer>
      )}
      <PriceInput
        placeholder={'가격(선택사항)'}
        type="number"
        value={price}
        onChange={({ target }) => onPriceChange(target.value)}
      />
      <ContentInput
        placeholder={`${currentRegionAddressName}에 올릴 게시물을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)`}
        value={content}
        onChange={({ target }) => onContentChange(target.value)}
      />
    </StyledMain>
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
