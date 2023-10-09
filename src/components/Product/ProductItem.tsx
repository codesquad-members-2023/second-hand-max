import dotsIcon from "@assets/icon/dots.svg";
import heartIcon from "@assets/icon/heart.svg";
import messageIcon from "@assets/icon/message.svg";
import defaultProductThumbnail from "@assets/images/default-thumbnail.png";
import DeleteAlert from "@components/DeleteAlert";
import Button from "@components/common/Button";
import { Dropdown, DropdownItem } from "@components/common/Dropdown";
import { formatAsPrice, parseNeighborhood } from "@utils/stringFormatters";
import { convertPastTimestamp } from "@utils/time";
import { ProductItemType } from "api/productItem";
import useProductItemDeleteMutation from "api/queries/useProductItemDeleteMutation";
import useProductItemStatusEditMutation from "api/queries/useProductItemStatusEditMutation";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { HTTPSTATUS } from "api/types";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

type Props = {
  item: ProductItemType;
};

export default function ProductItem({ item }: Props) {
  const navigate = useNavigate();
  const productItemRef = useRef(null);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { data: userInfo } = useUserInfoQuery();

  const { mutate: statusEditMutate } = useProductItemStatusEditMutation(
    item.id
  );

  const { mutateAsync: deleteProductMutationAsync } =
    useProductItemDeleteMutation(Number(item.id));

  const onClickProductItem = () => {
    navigate(`/product/${item.id}`);
  };

  const openDeleteAlert = () => {
    setIsDeleteAlertOpen(true);
  };

  const closeDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  const isUserSeller = userInfo?.userId === item.sellerId;

  const sellerOptions = [
    {
      item: { id: 0, title: "게시글 수정" },
      onClick: () => navigate(`/product/${item.id}/edit`),
    },
    {
      item: { id: 0, title: "판매 중 상태로 전환" },
      onClick: () => statusEditMutate({ status: 1 }),
    },
    {
      item: { id: 0, title: "판매 완료 상태로 전환" },
      onClick: () => statusEditMutate({ status: 2 }),
    },
    {
      variant: "danger",
      item: { id: 0, title: "삭제" },
      // TODO: open confirmation modal
      onClick: () => openDeleteAlert(),
    },
  ];

  const deleteProductItem = async (id: number): Promise<void> => {
    const res = await deleteProductMutationAsync(id);
    if (res.code === HTTPSTATUS.success) {
      closeDeleteAlert();
    }
  };

  return (
    <StyledProductItem onClick={onClickProductItem} ref={productItemRef}>
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        onClose={closeDeleteAlert}
        onDelete={() => deleteProductItem(Number(item.id))}
      />
      <div>
        <ProductItemThumbnail
          src={item.thumbnailUrl || defaultProductThumbnail}
        />
      </div>
      <ProductItemContent>
        <Information>
          <ContentHeader>
            <span>{item.title}</span>
            {isUserSeller && (
              <Dropdown
                leftOrRight="right"
                buttonContent={
                  <Button variant="plain" style={{ padding: 0 }}>
                    <img src={dotsIcon} />
                  </Button>
                }
                boundaryElementRef={productItemRef}>
                {sellerOptions.map(({ variant, item, onClick }, idx) => (
                  <DropdownItem key={idx} variant={variant} onClick={onClick}>
                    {item.title}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </ContentHeader>
          <RegionAndTime>
            {parseNeighborhood(item.region)}・
            {convertPastTimestamp(item.updatedAt)}
          </RegionAndTime>
          <BadgeAndPrice>
            {item.status && <Badge>{item.status}</Badge>}
            <Price>
              {item.price
                ? `${formatAsPrice(String(item.price))}원`
                : "가격미정"}
            </Price>
          </BadgeAndPrice>
        </Information>
        <ReactionContainer>
          <ReactionItem>
            <ReactionImage src={messageIcon} alt="chat" />
            <ReactionDesc>{item.numChat}</ReactionDesc>
          </ReactionItem>
          <ReactionItem>
            <ReactionImage src={heartIcon} alt="heart" />
            <ReactionDesc>{item.numLikes}</ReactionDesc>
          </ReactionItem>
        </ReactionContainer>
      </ProductItemContent>
    </StyledProductItem>
  );
}

const StyledProductItem = styled.li`
  width: inherit;
  height: 152px;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
`;

const ProductItemThumbnail = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 8px;
  object-fit: cover;
`;

const ProductItemContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`;

const Information = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContentHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font: ${({ theme: { font } }) => font.displayDefault16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const RegionAndTime = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.textWeak};
`;

const BadgeAndPrice = styled.div`
  width: 226px;
  height: 24px;
  display: flex;
  align-self: center;
  align-items: center;
  gap: 4px;
`;

const Badge = styled.div`
  min-width: 50px;
  height: 100%;
  padding-inline: 8px;
  display: flex;
  align-items: center;
  background: ${({ theme: { color } }) => color.accent.backgroundSecondary};
  border-radius: 8px;
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.accent.text};
  line-height: 100%;
`;

const Price = styled.div`
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const ReactionContainer = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  color: ${({ theme: { color } }) => color.neutral.textWeak};
`;

const ReactionItem = styled.div`
  width: 23px;
  height: inherit;
  display: flex;
  align-items: center;
`;

const ReactionImage = styled.img`
  width: 16px;
  height: 16px;
  filter: ${({ theme: { filter } }) => filter.neutralTextWeak};
`;

const ReactionDesc = styled.span`
  width: 7px;
  height: inherit;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  font: ${({ theme: { font } }) => font.displayDefault12};
`;
