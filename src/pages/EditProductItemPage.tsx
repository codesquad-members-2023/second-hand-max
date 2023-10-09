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
import { areDifferent } from "@utils/objectDifferences";
import {
  formatAsNumber,
  formatAsPrice,
  parseNeighborhood,
} from "@utils/stringFormatters";
import { ProductItemDetails } from "api/productItem";
import useCategoriesQuery from "api/queries/useCategoriesQuery";
import { useProductItemDetailsQuery } from "api/queries/useProductItemDetailsQuery";
import useProductItemEditMutation from "api/queries/useProductItemEditMutation";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function EditProductItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedRegion } = useContext(ProductItemsFiltersContext);

  const { data: productItemDetails, isLoading: isLoadingProductItemDetails } =
    useProductItemDetailsQuery(Number(id));
  const { data: categories } = useCategoriesQuery();
  const { mutate: productItemEditMutate } = useProductItemEditMutation(
    Number(id)
  );

  const initialValues: MutableRefObject<
    Pick<
      ProductItemDetails,
      "title" | "content" | "price" | "images" | "category"
    >
  > = useRef({
    title: "",
    content: "",
    price: 0,
    images: [],
    category: { id: 0, title: "" },
  });

  const { value: titleInputValue, onChange: onTitleInputChange } = useText({
    initialValue: initialValues.current.title,
  });
  const { value: contentInputValue, onChange: onContentInputChange } = useText({
    initialValue: initialValues.current.content,
  });
  const { value: priceInputValue, onChange: onPriceInputChange } = useText({
    initialValue: String(initialValues.current.price),
  });
  const { threeCategoryTags, selectedCategoryTag, onCategoryTagSelect } =
    useRandomCategories({
      categoryList: categories ?? [],
      prevCategory: initialValues.current.category,
    });
  const {
    uploadedImagesList,
    initializeUploadedImagesList,
    onImageUpload,
    onImageDelete,
  } = useUploadedImagesList();

  useEffect(() => {
    if (productItemDetails) {
      const { title, category, price, content, images } = productItemDetails;

      // 비교를 위한 기존 값 저장
      initialValues.current = {
        title: title,
        category: category,
        price: price,
        content: content,
        images: images ? [...images] : [],
      };

      // 새 input에 기존 값 할당
      onTitleInputChange(title);
      onPriceInputChange(String(price));
      onCategoryTagSelect(category);
      onContentInputChange(content);
      initializeUploadedImagesList(images ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productItemDetails]);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPictureHover, setIsPictureHover] = useState(false);

  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDraggable();

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

  const onUpdatedProductSubmit = async () => {
    const updatedData = {
      title: titleInputValue,
      categoryId: selectedCategoryTag.id,
      price: Number(formatAsNumber(priceInputValue)),
      content: contentInputValue,
      regionId: selectedRegion.id,
      imageIds: uploadedImagesList.map((picture) => picture.id),
    };

    productItemEditMutate(updatedData);
  };

  const isValid =
    titleInputValue.length > 0 &&
    contentInputValue.length > 0 &&
    uploadedImagesList.length <= 10 &&
    areDifferent(initialValues.current, {
      title: titleInputValue,
      category: selectedCategoryTag,
      price: Number(priceInputValue),
      content: contentInputValue,
      images: uploadedImagesList,
    });

  if (isLoadingProductItemDetails) {
    return <StyledEditProductItemPage>Loading...</StyledEditProductItemPage>;
  }

  return (
    <StyledEditProductItemPage>
      {isCategoryOpen ? (
        <CategoryModal
          categoryList={categories ?? []}
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
        <Button
          style={{ width: "62px" }}
          variant="plain"
          disabled={!isValid}
          onClick={onUpdatedProductSubmit}>
          <CompleteButtonText $isValid={isValid}>완료</CompleteButtonText>
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
              uploadedImagesList.map((picture) => {
                const imageUrl = picture.imageUrl;
                return (
                  <PictureWrapper key={picture.id}>
                    <Picture src={imageUrl} alt={String(picture.id)} />
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
              value={titleInputValue}
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
          <InputArea>
            <WonSymbol>₩</WonSymbol>
            <PriceInput
              type="text"
              placeholder="가격(선택사항)"
              value={formatAsPrice(priceInputValue) || ""}
              onChange={(e) => onPriceInputChange(e.target.value.trim())}
              maxLength={12}
            />
          </InputArea>
          <ContentArea
            value={contentInputValue}
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
    </StyledEditProductItemPage>
  );
}

const StyledEditProductItemPage = styled.div`
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
    height: 8px;
    display: ${({ $isPictureHover }) => ($isPictureHover ? "auto" : "none")};
    border-radius: 16px;
  }

  &::-webkit-scrollbar-thumb {
    width: 20px;
    height: 6px;
    background: ${({ theme: { color } }) => color.neutral.backgroundBold};
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
  height: calc(100% - 64px);
  max-height: 100%;
  padding-bottom: 80px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  word-wrap: break-word;
  overflow: scroll;
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

const Picture = styled.img`
  width: 80px;
  height: 80px;
  border: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 16px;
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
