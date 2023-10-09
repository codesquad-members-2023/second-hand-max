import chevronDownIcon from "@assets/icon/chevron-down.svg";
import chevronLeftIcon from "@assets/icon/chevron-left.svg";
import dotsIcon from "@assets/icon/dots.svg";
import filledHeartIcon from "@assets/icon/heart-filled.svg";
import emptyHeartIcon from "@assets/icon/heart.svg";
import defaultProductThumbnail from "@assets/images/default-thumbnail.png";
import AppBar from "@components/AppBar";
import DeleteAlert from "@components/DeleteAlert";
import Button from "@components/common/Button/Button";
import DraggableImageSlider from "@components/common/DraggableImageSlider/DraggableImageSlider";
import { Dropdown, DropdownItem } from "@components/common/Dropdown";
import { formatAsPrice } from "@utils/stringFormatters";
import { convertPastTimestamp } from "@utils/time";
import useProductItemDeleteMutation from "api/queries/useProductItemDeleteMutation";
import { useProductItemDetailsQuery } from "api/queries/useProductItemDetailsQuery";
import useProductItemStatusEditMutation from "api/queries/useProductItemStatusEditMutation";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import useWishlistItemAddMutation from "api/queries/useWishlistItemAddMutation";
import useWishlistItemRemoveMutation from "api/queries/useWishlistItemRemoveMutation";
import { HTTPSTATUS } from "api/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function ProductItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productItemPageRef = useRef(null);

  const { data: user } = useUserInfoQuery();

  const { data: productItemDetails, isLoading: isLoadingProductItemdetails } =
    useProductItemDetailsQuery(Number(id));
  const [likedData, setLikedData] = useState<{
    isLiked: boolean;
    numLikes: number;
  }>({
    isLiked: false,
    numLikes: 0,
  });

  const { mutateAsync: deleteProductMutationAsync } =
    useProductItemDeleteMutation(Number(id));
  const { mutateAsync: wishlistItemAddMutateAsync } =
    useWishlistItemAddMutation(Number(id));
  const { mutateAsync: wishlistItemRemoveMutateAsync } =
    useWishlistItemRemoveMutation(Number(id));
  const { mutate: statusEditMutate } = useProductItemStatusEditMutation(
    productItemDetails?.id ?? 0
  );

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    // 찜 관련 초기화
    if (productItemDetails) {
      const { isLiked, numLikes } = productItemDetails;
      setLikedData({ isLiked, numLikes });
    }
  }, [productItemDetails]);

  const goPrevPage = () => {
    navigate("/");
  };

  const openDeleteAlert = () => {
    setIsDeleteAlertOpen(true);
  };

  const closeDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  const onToggleWishlisted = async () => {
    if (likedData.isLiked === true) {
      const res = await wishlistItemRemoveMutateAsync();
      if (res.code === HTTPSTATUS.success) {
        setLikedData((prev) => ({
          isLiked: false,
          numLikes: prev.numLikes - 1,
        }));
      }
    } else {
      const res = await wishlistItemAddMutateAsync();
      if (res.code === HTTPSTATUS.created) {
        setLikedData((prev) => ({
          isLiked: true,
          numLikes: prev.numLikes + 1,
        }));
      }
    }
  };

  const deleteProductItem = async (id: number): Promise<void> => {
    const res = await deleteProductMutationAsync(id);
    if (res.code === HTTPSTATUS.success) {
      closeDeleteAlert();
    }
  };

  const sellerOptions = [
    {
      item: { id: 0, title: "판매중" },
      onClick: () => statusEditMutate({ status: 1 }),
    },
    {
      item: { id: 0, title: "예약중" },
      onClick: () => statusEditMutate({ status: 3 }),
    },
    {
      item: { id: 0, title: "판매완료" },
      onClick: () => statusEditMutate({ status: 2 }),
    },
  ];

  // TODO: 내부에서 loader 띄우기
  if (isLoadingProductItemdetails && !productItemDetails)
    return <div>로딩중</div>;

  return (
    <StyledProductItemPage ref={productItemPageRef}>
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        onClose={closeDeleteAlert}
        onDelete={() => deleteProductItem(Number(id))}
      />
      <Wrapper>
        <AppBar padding="8px 0" height="56px" isTop={true} isTransparent={true}>
          <ButtonContainer onClick={goPrevPage}>
            <Button style={{ padding: 0 }} variant="plain">
              <img src={chevronLeftIcon} alt="뒤로가기" />
            </Button>
            <span>뒤로</span>
          </ButtonContainer>
          <DropdownContainer>
            {user?.userId === productItemDetails?.seller.id && (
              <Dropdown
                leftOrRight="right"
                buttonContent={
                  <Button variant="plain">
                    <DotsImage src={dotsIcon} alt="dots" />
                  </Button>
                }
                boundaryElementRef={productItemPageRef}>
                <DropdownItem
                  onClick={() => {
                    navigate(`/product/${id}/edit`);
                  }}>
                  게시글 수정
                </DropdownItem>
                <DropdownItem onClick={openDeleteAlert} variant="danger">
                  <DeleteText>삭제</DeleteText>
                </DropdownItem>
              </Dropdown>
            )}
          </DropdownContainer>
        </AppBar>
        <ImageSliderContainer>
          <DraggableImageSlider
            imageList={
              productItemDetails?.images
                ? productItemDetails.images
                : [{ id: 0, imageUrl: defaultProductThumbnail }]
            }
            description={productItemDetails?.title}
          />
        </ImageSliderContainer>
        <ProductInfo>
          <SellerInfo>
            <h3>판매자 정보</h3>
            <span>{productItemDetails?.seller.nickname}</span>
          </SellerInfo>
          {user?.userId === productItemDetails?.seller.id && (
            <StatusTab>
              <Dropdown
                leftOrRight="left"
                buttonContent={
                  <Button
                    variant="plain"
                    style={{ padding: "0 16px", flexDirection: "row" }}>
                    <ProductStatus>{productItemDetails?.status}</ProductStatus>
                    <ChevronImage src={chevronDownIcon} alt="펼치기" />
                  </Button>
                }
                boundaryElementRef={productItemPageRef}>
                {sellerOptions.map(({ item, onClick }, idx) => (
                  <DropdownItem key={idx} onClick={onClick}>
                    {item.title}
                  </DropdownItem>
                ))}
              </Dropdown>
            </StatusTab>
          )}

          <TextInfoArea>
            <TextInfoHeader>
              <h1>{productItemDetails?.title}</h1>
              <span>
                {productItemDetails?.category.title} ・{" "}
                {convertPastTimestamp(productItemDetails?.updatedAt ?? "")}
              </span>
            </TextInfoHeader>
            <p>{productItemDetails?.content}</p>
            <span>
              채팅 {productItemDetails?.numChat} 관심{" "}
              {productItemDetails?.numLikes} 조회 {productItemDetails?.numViews}
            </span>
          </TextInfoArea>
        </ProductInfo>
      </Wrapper>
      <AppBar padding="16px" height="64px" isTop={false}>
        <Button variant="plain" onClick={onToggleWishlisted}>
          {likedData.isLiked ? (
            <img src={filledHeartIcon} alt="찜하기" />
          ) : (
            <img src={emptyHeartIcon} alt="찜하기" />
          )}
        </Button>
        <NumLikesText>{formatAsPrice(String(likedData.numLikes))}</NumLikesText>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            width: "115px",
            height: "32px",
            padding: 0,
            marginLeft: "auto",
          }}
          variant="contained">
          대화 중인 채팅방
        </Button>
      </AppBar>
    </StyledProductItemPage>
  );
}

const StyledProductItemPage = styled.div`
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Wrapper = styled.div`
  width: inherit;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  width: 86px;
  height: 40px;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  > button {
    width: 24px;
    height: 24px;

    > img {
      filter: ${({ theme: { filter } }) => filter.accentText};
    }
  }

  > span {
    width: 46px;
    height: 24px;
    padding: 0 8px;
    font: ${({ theme: { font } }) => font.displayStrong16};
    color: ${({ theme: { color } }) => color.accent.text};
  }
`;

const DropdownContainer = styled.div`
  margin-left: auto;
`;

const DotsImage = styled.img`
  filter: ${({ theme: { filter } }) => filter.accentText};
`;

const ImageSliderContainer = styled.div`
  display: flex;
  width: 393px;
  height: 491px;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.24) 0%,
      rgba(0, 0, 0, 0.138832) 9.16%,
      rgba(0, 0, 0, 0) 26.27%
    );
  }
`;

const ProductInfo = styled.div`
  width: 393px;
  padding: 16px 16px 96px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: ${({ theme: { color } }) => color.neutral.background};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SellerInfo = styled.div`
  width: 361px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;

  background: ${({ theme: { color } }) => color.neutral.backgroundWeak};
  > h3 {
    font: ${({ theme: { font } }) => font.displayDefault16};
    color: ${({ theme: { color } }) => color.neutral.text};
  }

  > span {
    font: ${({ theme: { font } }) => font.displayStrong16};
    color: ${({ theme: { color } }) => color.neutral.textStrong};
  }
`;

const StatusTab = styled.div`
  height: 32px;
  margin-top: 14px;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  border-radius: 8px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.border};
`;

const ProductStatus = styled.span`
  width: 56px;
  font: ${({ theme: { font } }) => font.availableDefault12};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
  text-align: left;
`;

const ChevronImage = styled.img`
  width: 16px;
  height: 16px;
`;

const TextInfoArea = styled.div`
  margin-top: 16px;
  width: 363px;
  height: 304px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  > p {
    width: inherit;
    height: 200px;
    font: ${({ theme: { font } }) => font.displayDefault16};
    color: ${({ theme: { color } }) => color.neutral.text};
    white-space: normal;
    word-break: break-all;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  > span {
    width: 100%;
    height: 16px;
    font: ${({ theme: { font } }) => font.displayDefault12};
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const TextInfoHeader = styled.div`
  width: 363px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  > h1 {
    width: 100%;
    font: ${({ theme: { font } }) => font.displayStrong20};
    color: ${({ theme: { color } }) => color.neutral.textStrong};
  }

  > span {
    width: 100%;
    height: 16px;
    font: ${({ theme: { font } }) => font.displayDefault12};
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const NumLikesText = styled.span`
  font: ${({ theme: { font } }) => font.displayDefault16};
`;

const DeleteText = styled.span`
  color: ${({ theme: { color } }) => color.system.warning};
`;
