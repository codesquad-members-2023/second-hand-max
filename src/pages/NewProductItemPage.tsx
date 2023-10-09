import chevronRightIcon from "@assets/icon/chevron-right.svg";
import circleXIcon from "@assets/icon/circle-x-filled.svg";
import mapIcon from "@assets/icon/map-pin-filled.svg";
import AppBar from "@components/AppBar";
import CategoryModal from "@components/Category/CategoryModal";
import Button from "@components/common/Button/Button";
import ImageInputButton from "@components/common/ImageInputButton/ImageInputButton";
import { Tag } from "@components/common/Tag/Tag";
import { ProductItemsFiltersContext } from "@context/ProductItemsFiltersContext";
import useDraggable from "@hooks/useDraggable";
import useRandomCategories, { CategoryTag } from "@hooks/useRandomCategories";
import useText from "@hooks/useText";
import useUploadedImagesList from "@hooks/useUploadedImagesList";
import {
  formatAsNumber,
  formatAsPrice,
  parseNeighborhood,
} from "@utils/stringFormatters";
import { PictureType } from "api/productItem";
import useCategoriesQuery from "api/queries/useCategoriesQuery";
import useNewProductItemMutation from "api/queries/useNewProductItemMutation";
import { ChangeEvent, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function NewProductItemPage() {
  const navigate = useNavigate();

  const { selectedRegion } = useContext(ProductItemsFiltersContext);

  const { data: categoryList, isLoading } = useCategoriesQuery();

  const { value: titleInputValue, onChange: onTitleInputChange } = useText();
  const { value: contentInputValue, onChange: onContentInputChange } =
    useText();
  const { value: priceInputValue, onChange: onPriceInputChange } = useText();
  const { threeCategoryTags, selectedCategoryTag, onCategoryTagSelect } =
    useRandomCategories({ categoryList: categoryList ?? [] });

  const { uploadedImagesList, onImageUpload, onImageDelete } =
    useUploadedImagesList();

  const { mutate: newProductItemMutate } = useNewProductItemMutation({
    regionId: selectedRegion.id,
    categoryId: selectedCategoryTag.id,
  });

  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDraggable();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPictureHover, setIsPictureHover] = useState(false);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value.trim();
    if (newVal.length > 11) {
      onPriceInputChange("999,999,999");
    } else {
      onPriceInputChange(newVal);
    }
  };

  const onShowScrollBar = () => {
    setIsPictureHover(true);
  };

  const onDragSlideEnd = () => {
    onDragEnd();
    setIsPictureHover(false);
  };

  const onCategoryOpen = () => {
    setIsCategoryOpen(true);
  };

  const onCategoryClose = () => {
    setIsCategoryOpen(false);
  };

  const onPostNewProduct = async () => {
    if (!categoryList) return;

    const selectedCategory = categoryList.find(
      (category) => category.title === selectedCategoryTag.title
    );

    if (selectedCategory === undefined) {
      toast.error("카테고리가 선택되지 않았습니다");
      return;
    }

    const requestData = {
      title: titleInputValue,
      price: Number(formatAsNumber(priceInputValue)),
      content: contentInputValue,
      imageIds: uploadedImagesList.map((picture) => Number(picture.id)),
      categoryId: selectedCategory.id,
      regionId: selectedRegion.id,
    };

    newProductItemMutate(requestData);
  };

  const isValid =
    titleInputValue.length > 0 &&
    contentInputValue.length > 0 &&
    uploadedImagesList.length <= 10;

  // TODO
  if (isLoading) return <div>로딩중</div>;

  return (
    <StyledNewProductItemPage>
      {isCategoryOpen ? (
        <CategoryModal
          categoryList={categoryList ?? []}
          currentSelectedCategory={selectedCategoryTag}
          onCategoryModalClose={onCategoryClose}
          onCategoryItemSelect={onCategoryTagSelect}
        />
      ) : null}
      <AppBar>
        <Button
          style={{ width: "62px" }}
          variant="plain"
          onClick={() => navigate("/")}>
          <CloseButtonText>닫기</CloseButtonText>
        </Button>
        <TitleArea style={{ flexGrow: "1" }}>내 물건 팔기</TitleArea>
        <Button style={{ width: "62px" }} variant="plain">
          <CompleteButtonText onClick={onPostNewProduct} $isValid={isValid}>
            완료
          </CompleteButtonText>
        </Button>
      </AppBar>
      <Main>
        <Container>
          <PictureArea
            ref={scrollContainerRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragSlideEnd}
            onMouseEnter={onShowScrollBar}
            $isPictureHover={isPictureHover}>
            <ImageInputButton
              numUploadedImages={uploadedImagesList.length}
              maxNumImages={10}
              onChange={onImageUpload}
            />
            {uploadedImagesList &&
              uploadedImagesList.map((picture: PictureType) => {
                return (
                  <PictureWrapper key={picture.id}>
                    <Picture src={picture.imageUrl} alt={String(picture.id)} />
                    <Button
                      onClick={() => onImageDelete(picture.id)}
                      variant="plain"
                      style={{
                        zIndex: 10,
                        padding: 0,
                        right: -8,
                        top: -8,
                        position: "absolute",
                      }}>
                      <img src={circleXIcon} alt="delete" />
                    </Button>
                  </PictureWrapper>
                );
              })}
          </PictureArea>
          <InputArea>
            <TitleInput
              type="text"
              placeholder="내용을 입력하세요"
              onChange={(e) => onTitleInputChange(e.target.value.trim())}
            />
            {titleInputValue.length > 0 && (
              <CategoryArea>
                <TagArea>
                  {threeCategoryTags.map((tag: CategoryTag) => (
                    <Tag
                      key={tag.id}
                      title={tag.title}
                      isSelected={selectedCategoryTag.title === tag.title}
                      onClick={() => onCategoryTagSelect(tag)}
                    />
                  ))}
                </TagArea>
                <Button
                  variant="plain"
                  style={{ padding: "0" }}
                  onClick={onCategoryOpen}>
                  <img src={chevronRightIcon} alt="chevronRightIcon" />
                </Button>
              </CategoryArea>
            )}
          </InputArea>
          <PriceInputArea>
            <WonSymbol>₩</WonSymbol>
            <PriceInput
              type="text"
              placeholder="가격 (선택사항)"
              value={formatAsPrice(priceInputValue) || ""}
              onChange={onPriceChange}
            />
          </PriceInputArea>
          <ContentArea
            placeholder="게시물 내용을 작성해주세요 (판매금지 물품은 게시가 제한될 수 있어요)"
            onChange={(e) => onContentInputChange(e.target.value.trim())}
          />
        </Container>
      </Main>
      <AppBar isTop={false} padding="16px" height="64px">
        <Button
          variant="plain"
          style={{
            height: "32px",
            padding: "0",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}>
          <img src={mapIcon} alt="map" />
          <RegionText>{parseNeighborhood(selectedRegion.title)}</RegionText>
        </Button>
      </AppBar>
    </StyledNewProductItemPage>
  );
}

const StyledNewProductItemPage = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme: { color } }) => color.neutral.background};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 72px 16px 0px 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 361px;
  height: 100%;
  background: ${({ theme: { color } }) => color.neutral.background};
`;

const CategoryArea = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const TagArea = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  gap: 4px;
`;

const PictureArea = styled.div<{ $isPictureHover: boolean }>`
  width: inherit;
  padding-top: 8px;
  padding-bottom: ${({ $isPictureHover }) =>
    $isPictureHover ? "8px" : "16px"};
  display: flex;
  gap: 16px;
  border-bottom: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  overflow-x: scroll;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: ${({ $isPictureHover }) => ($isPictureHover ? "auto" : "none")};

    height: 8px;
    border-radius: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme: { color } }) => color.neutral.backgroundBold};

    width: 20px;
    height: 6px;
    border-radius: 16px;
  }
`;

const PictureWrapper = styled.div`
  position: relative;
`;

const RegionText = styled.div`
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const WonSymbol = styled.span`
  width: 10px;
  height: 24px;
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const ContentArea = styled.textarea`
  font: ${({ theme: { font } }) => font.availableDefault16};
  height: calc(100% - 64px);
  overflow: overlay;
  word-wrap: break-word;

  max-height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const PriceInput = styled.input`
  height: 24px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const TitleInput = styled.input`
  height: 24px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const InputArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme: { color } }) => color.neutral.textWeak};
  padding-bottom: 16px;
  border-bottom: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
`;

const PriceInputArea = styled(InputArea)`
  flex-direction: row;
`;

const Picture = styled.img`
  width: 80px;
  height: 80px;
  border: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 16px;
  cursor: grab;
`;

const CloseButtonText = styled.div`
  width: 46px;
  height: 24px;
  padding: 0px 8px;
  align-items: center;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const TitleArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;

  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const CompleteButtonText = styled.div<{ $isValid: boolean }>`
  width: 46px;
  height: 24px;
  padding: 0px 8px;
  align-items: center;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color }, $isValid }) =>
    $isValid ? color.accent.backgroundPrimary : color.neutral.borderStrong};
`;
