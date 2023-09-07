import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getCategories } from '../../api/fetcher';
import { Header } from '../../components/Header';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';
import { IconsType } from '../../components/icon/icons';
import { useScreenConfigStore } from '../../stores/useScreenConfigStore';

type CategoryData = {
  id: number;
  name: string;
  iconName: IconsType;
};

type CategoryFilterPanelProps = {
  closePanel: () => void;
  selectCategory: (id: number) => void;
  isOpenPanel: boolean;
};

export const CategoryFilterPanel = memo(
  ({ closePanel, selectCategory, isOpenPanel }: CategoryFilterPanelProps) => {
    const { screenWidth } = useScreenConfigStore();
    const [rightPosition, setRightPosition] = useState(
      isOpenPanel ? 0 : -screenWidth
    );

    const { data: categoryData } = useQuery<CategoryData[], Error>(
      ['category'],
      getCategories
    );

    // TODO : 홈과 함께 로딩, 에러 적용하기

    useEffect(() => {
      if (isOpenPanel) {
        setRightPosition(0);
      } else {
        setRightPosition(-screenWidth);
      }
    }, [isOpenPanel, screenWidth]);

    const onTransitionEndHandler = () => {
      rightPosition !== 0 && closePanel();
    };

    const onClose = () => {
      setRightPosition(-screenWidth);
    };

    const onClickCategory = (id: number) => {
      onClose();
      selectCategory(id);
    };

    return (
      <Div $right={rightPosition} onTransitionEnd={onTransitionEndHandler}>
        <Header
          leftButton={
            <Button styledType="text" onClick={onClose}>
              <Icon name="chevronLeft" color="neutralTextStrong" />
              <span>뒤로</span>
            </Button>
          }
          title="카테고리"
        />
        (
        <Body>
          {categoryData && (
            <>
              {categoryData.map(category => {
                return (
                  <Category
                    key={category.id}
                    onClick={() => onClickCategory(category.id)}
                  >
                    <CategoryIcon>
                      <Icon
                        name={category.iconName}
                        color="neutralTextStrong"
                      />
                    </CategoryIcon>
                    <span>{category.name}</span>
                  </Category>
                );
              })}
            </>
          )}
        </Body>
        )
      </Div>
    );
  }
);

const Div = styled.div<{ $right: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: ${({ $right }) => `${$right}px`};
  display: flex;
  align-items: center;
  flex-direction: column;
  border: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  background: ${({ theme }) => theme.color.accentText};
  transition: right 0.6s;
  z-index: 10;
`;

const Body = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 32px;
  justify-content: center;
  align-items: center;
  grid-template-columns: 80px 80px 80px;
  flex: 1;
  padding: 40px;
  margin-top: 56px;

  @media (max-width: 375px) {
    grid-gap: 16px;
    padding: 20px;
  }
`;

const Category = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  & span {
    font: ${({ theme }) => theme.font.displayDefault12};
    color: ${({ theme }) => theme.color.neutralText};
  }
`;

const CategoryIcon = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
