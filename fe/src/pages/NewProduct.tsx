import { EditBar } from '@components/common/actionBar/EditBar';
import { Button } from '@components/common/button/Button';
import { Input } from '@components/common/input/Input';
import { TextArea } from '@components/common/input/TextArea';
import { CategoryModal } from '@components/common/modal/categoryModal/CategoryModal';
import { LeftButton } from '@components/common/topBar/LeftButton';
import { RightButton } from '@components/common/topBar/RightButton';
import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { CategorySelector } from '@components/new/CategorySelector';
import { ImageInput } from '@components/new/ImageInput';
import { LocationSelector } from '@components/new/LocationSelector';
import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { useCategorySelector } from '@hooks/useCategorySelector';
import { useInitialInputValues } from '@hooks/useInitialInputValues';
import { useInput } from '@hooks/useInput';
import { useLocationSelector } from '@hooks/useLocationSelector';
import { usePrice } from '@hooks/usePrice';
import { useProductAddition } from '@queries/products';
import { usePathHistoryStore } from '@stores/pathHistoryStore';
import { commaStringToNumber } from '@utils/formatPrice';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const NewProduct: React.FC = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { setPrevUrl } = usePathHistoryStore();
  const initialInputValues = useInitialInputValues(Number(productId));

  const [imageList, setImageList] = useState<ImageType[]>(
    initialInputValues.images,
  );
  const {
    value: title,
    onChangeValue: onChangeTitle,
    isValidValue: isValidTitle,
  } = useInput({
    initialValue: initialInputValues.title,
    validator: (value) => value.length > 0,
    warningMessage: '제목을 입력해주세요',
  });
  const { selectedCategory, categories, selectCategory } = useCategorySelector({
    initialCategoryName: initialInputValues.category,
  });
  const { price, onChangePrice, priceWarningMessage, isValidPrice } = usePrice({
    initialPrice: initialInputValues.price,
  });
  const [description, setDescription] = useState(
    initialInputValues.description,
  );
  const { selectedLocation, selectLocation, locations } = useLocationSelector({
    initialLocation: initialInputValues.location,
  });
  const productAdditionMutation = useProductAddition();

  useEffect(() => {
    setPrevUrl(currentLocation.pathname);
  }, [currentLocation, setPrevUrl]);

  useEffect(() => {
    if (!productId) {
      return;
    }
    // 상품 수정 시 상품 정보를 불러와서 초기값으로 설정
    setImageList(initialInputValues.images);
    onChangeTitle(initialInputValues.title);
    selectCategory(initialInputValues.category);
    onChangePrice(initialInputValues.price);
    setDescription(initialInputValues.description);
    selectLocation(initialInputValues.location);
  }, [initialInputValues]);

  const isRequiredFieldsFilled =
    imageList.length !== 0 && title && selectedCategory && selectedLocation;
  const isAllFieldsValid = isValidTitle && isValidPrice;

  const submitProductData = () => {
    if (!isRequiredFieldsFilled || !isAllFieldsValid) {
      return;
    }

    const productData = {
      name: title,
      price: commaStringToNumber(price),
      content: description,
      images: imageList.map((image) => image.imageId),
      categoryId: selectedCategory.id,
      locationId: selectedLocation.id,
    };

    productAdditionMutation.mutate(productData, {
      onSuccess: (result) => {
        if (result.success) {
          // 등록 성공 시 상품 상세 페이지로 이동
          navigate(`${PATH.detail}/${result.data?.productId}`, {
            replace: true,
          });
          return;
        }
        // 등록 실패 시 사용자 피드백
      },
    });
  };

  return (
    <>
      <TopBar>
        <Title>내 물건 팔기</Title>
        <LeftButton>
          <Button variant="text" onClick={() => navigate(-1)}>
            <span className="control-btn">닫기</span>
          </Button>
        </LeftButton>
        <RightButton>
          <Button
            variant="text"
            disabled={!isRequiredFieldsFilled || !isAllFieldsValid}
            onClick={submitProductData}
          >
            <span className="control-btn">확인</span>
          </Button>
        </RightButton>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <div className="input-container">
          <div className="image-input">
            <ImageInput
              imageList={imageList}
              onAddImage={(image: ImageType) =>
                setImageList((i) => [...i, image])
              }
              onDeleteImage={(image: ImageType) =>
                setImageList((i) =>
                  i.filter((img) => img.imageId !== image.imageId),
                )
              }
            />
          </div>
          <div className="title-input">
            <Input
              variant="ghost"
              value={title}
              placeholder="내용을 입력하세요"
              onChange={onChangeTitle}
            />
            {(title || selectedCategory) && (
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={selectCategory}
              />
            )}
          </div>
          <div className="price-input">
            <Input
              variant="ghost"
              label="₩"
              value={price}
              placeholder="가격(선택사항)"
              onChange={onChangePrice}
              warningMessage={priceWarningMessage}
            />
          </div>
          <div className="content-input">
            <TextArea
              value={description}
              minRows={5}
              onChange={(value: string) => setDescription(value)}
              placeholder="역삼 1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
            />
          </div>
        </div>
        <CategoryModal
          categoryList={categories}
          onSelectCategory={selectCategory}
        />
      </div>
      <EditBar>
        <LocationSelector
          selectedLocation={selectedLocation}
          locations={locations}
          onSelectLocation={selectLocation}
        />
      </EditBar>
    </>
  );
};

const pageStyle = (theme: Theme) => css`
  flex: 1;
  margin-top: 57px;
  margin-bottom: 64px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: ${theme.color.neutral.background};
  }

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 10px;
    background-color: ${theme.color.neutral.border};
    border: 3px solid ${theme.color.neutral.background};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  & .input-container {
    box-sizing: border-box;
    width: 393px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  & .image-input,
  & .title-input,
  & .price-input {
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    border-bottom: 0.8px solid ${theme.color.neutral.border};
  }
`;
