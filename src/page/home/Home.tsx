import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Error } from '../../components/Error';
import { Header } from '../../components/Header';
import { ProductItem } from '../../components/ProductItem';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { MenuItem } from '../../components/dropdown/MenuItem';
import { Icon } from '../../components/icon/Icon';
import { LocationModal } from '../../components/locations/LocationModal';
import { useGetItemData } from '../../queries/useItemQuery';
import { useGetUserLocation } from '../../queries/useLocationQuery';
import { CategoryFilterPanel } from './CategoryFilterPanel';

export function Home() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 선택된 categoryId 를 인자로 전달해서 카테고리 품목 필터링
  const { data: itemData, isLoading, isError } = useGetItemData(1);
  const { data: userLocationData } = useGetUserLocation();

  // useEffect에서 useInView 훅으로 무한스크롤 요청 구현 예정

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openPanel = () => {
    setIsOpenPanel(true);
  };

  const closePanel = () => {
    setIsOpenPanel(false);
  };

  return (
    <Div>
      {isOpenPanel && <CategoryFilterPanel closePanel={closePanel} />}
      <Header
        leftButton={
          <LeftAccessory>
            <Dropdown
              btnText={itemData?.pages[0].categoryName || '역삼1동'}
              iconName="chevronDown"
              align="left"
            >
              {userLocationData?.locations.map(location => {
                return (
                  <MenuItem
                    key={location.id}
                    font={
                      location.isSelected
                        ? 'enabledStrong16'
                        : 'availableDefault16'
                    }
                    onAction={() => {
                      console.log(`${location.name} 클릭됨`);
                    }}
                  >
                    {location.name}
                  </MenuItem>
                );
              })}
              <MenuItem onAction={openModal}>내 동네 설정하기</MenuItem>
            </Dropdown>
          </LeftAccessory>
        }
        rightButton={
          <RightAccessory>
            <Icon
              name="layoutGrid"
              color="neutralTextStrong"
              onClick={openPanel}
            />
          </RightAccessory>
        }
      />
      <Body ref={bodyRef} id="home--body__items">
        {itemData?.pages.map(page => {
          return page.items.map(item => {
            return <ProductItem key={item.id} {...item} />;
          });
        })}
        {itemData?.pages.length === 0 && (
          <Error message="판매 상품이 없습니다." />
        )}
      </Body>
      {isModalOpen && (
        <LocationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const LeftAccessory = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex: 1;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
`;

const RightAccessory = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 16px;
  margin-top: 56px;
`;
