import { Tag } from '@components/Tag';
import { ALL_CATEGORY_ID } from '.';
import styled from 'styled-components';

type Props = {
  categories?: { categoryId: number; categoryName: string }[];
  selectedCategoryId: number;
  onCategorySelect: (categoryId: number) => void;
};

export const CategoryTabs: React.FC<Props> = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
}) => {
  console.log(categories);
  return (
    <Tags>
      <Tag
        title="전체"
        isSelected={selectedCategoryId === ALL_CATEGORY_ID}
        onClick={() => onCategorySelect(ALL_CATEGORY_ID)}
      />
      {categories?.map((category) => (
        <Tag
          key={category.categoryId}
          title={category.categoryName}
          isSelected={selectedCategoryId === category.categoryId}
          onClick={() => onCategorySelect(category.categoryId)}
        />
      ))}
    </Tags>
  );
};

const Tags = styled.div`
  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  gap: 4px;
`;
