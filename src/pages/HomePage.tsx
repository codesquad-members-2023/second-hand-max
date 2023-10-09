import layoutGridIcon from "@assets/icon/layout-grid.svg";
import AppBar from "@components/AppBar";
import { FabButton } from "@components/Home/FabButton";
import NavBar from "@components/NavBar/NavBar";
import ProductItem from "@components/Product/ProductItem";
import RegionModal from "@components/Region/RegionModal";
import Button from "@components/common/Button/Button";
import InfiniteScrollList from "@components/common/InfiniteScroll/InfiniteScrollList";
import { SelectInput, SelectItem } from "@components/common/SelectInput";
import { ProductItemsFiltersContext } from "@context/ProductItemsFiltersContext";
import { parseNeighborhood } from "@utils/stringFormatters";
import useProductItemsInfiniteQuery from "api/queries/useProductItemsInfiniteQuery";
import useUserRegionsQuery from "api/queries/useUserRegionsQuery";
import { RegionType } from "api/region";
import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Routes from "router/Routes";
import { styled } from "styled-components";

export default function HomePage() {
  const navigate = useNavigate();

  const { selectedRegion, selectedCategory, onChangeSelectedRegion } =
    useContext(ProductItemsFiltersContext);

  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const {
    data: productItemsData,
    isLoading: isLoadingProductItems,
    isFetching: isFetchingProductItems,
    fetchNextPage: fetchMoreProductItems,
  } = useProductItemsInfiniteQuery({
    regionId: selectedRegion.id,
    categoryId: selectedCategory.id,
  });
  const { data: userRegions } = useUserRegionsQuery();

  // TODO
  // const [searchParams] = useSearchParams();
  // useEffect(() => {
  //   // URL query params 기준으로 `useProductItemsInfiniteQuery` 조작
  //   const regionId = searchParams.get("region");
  //   const categoryId = searchParams.get("category");
  // });

  const openRegionModal = () => {
    setIsRegionModalOpen(true);
  };

  const closeRegionModal = () => {
    setIsRegionModalOpen(false);
  };

  if (isLoadingProductItems) return <div>로딩중...</div>;

  return (
    <StyledHomePage>
      {isRegionModalOpen && userRegions ? (
        <RegionModal
          {...{
            userRegionList: userRegions.regions,
            closeRegionModal,
          }}
        />
      ) : null}
      <AppBar isTop={true}>
        <div style={{ flexGrow: 1 }}>
          <SelectInput
            name="선택된 동네"
            value={parseNeighborhood(selectedRegion.title) ?? ""}
            onChange={onChangeSelectedRegion}>
            {userRegions &&
              userRegions.regions.map((region: RegionType) => (
                <SelectItem key={region.id} item={region}>
                  {parseNeighborhood(region.title)}
                </SelectItem>
              ))}
            <SelectItem
              onClick={openRegionModal}
              item={{ id: 0, title: "내 동네 설정하기" }}>
              내 동네 설정하기
            </SelectItem>
          </SelectInput>
        </div>
        <Link to={Routes.CATEGORIES} style={{ padding: "0 8px" }}>
          <Button variant="plain" size="M">
            <img src={layoutGridIcon} alt="카테고리 보기" />
          </Button>
        </Link>
      </AppBar>
      <ProductItemArea>
        {isLoadingProductItems && <div>로딩중...</div>}
        <InfiniteScrollList
          style={{ padding: "56px 0 64px 0" }}
          onEndReached={() =>
            !isFetchingProductItems && fetchMoreProductItems()
          }>
          {productItemsData &&
            productItemsData.pages.map((group, idx) => (
              <Fragment key={idx}>
                {group.data.items?.map((item) => (
                  <ProductItem key={item.id} item={item} />
                ))}
              </Fragment>
            ))}
        </InfiniteScrollList>
      </ProductItemArea>
      <NavBar />
      <FabButton onClick={() => navigate(Routes.NEWPRODUCT)} />
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const ProductItemArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  background: ${({ theme: { color } }) => color.accent.text};
  &::-webkit-scrollbar {
    display: none;
  }
`;
