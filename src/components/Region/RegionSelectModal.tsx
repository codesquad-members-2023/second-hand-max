import circleXFilled from "@assets/icon/circle-x-filled.svg";
import plus from "@assets/icon/plus.svg";
import xIcon from "@assets/icon/x.svg";
import Button from "@components/common/Button/Button";
import Modal from "@components/common/Modal/Modal";
import { ModalHeader, ModalTitle } from "@components/common/Modal/ModalStyles";
import { ProductItemsFiltersContext } from "@context/ProductItemsFiltersContext";
import { parseNeighborhood } from "@utils/stringFormatters";
import useUserRegionDeleteMutation from "api/queries/useUserRegionDeleteMutation";
import { RegionType } from "api/region";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import { ButtonsContainer } from "./RegionModal";

type Props = {
  userRegionList: RegionType[];
  isRegionAddModal: boolean;
  closeRegionModal: () => void;
  onOpenRegionSelectModal: () => void;
};

export default function RegionSelectModal({
  userRegionList,
  isRegionAddModal,
  closeRegionModal,
  onOpenRegionSelectModal,
}: Props) {
  const { selectedRegion, onChangeSelectedRegion } = useContext(
    ProductItemsFiltersContext
  );

  const { mutate: userRegionDeleteMutate } = useUserRegionDeleteMutation();

  const onRegionDelete = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    itemId: number
  ) => {
    e.stopPropagation();

    const selectedOneRegion = userRegionList.length === 1;
    if (selectedOneRegion) {
      toast.error("동네는 최소 1개이상 선택해야해요");
      return;
    }

    userRegionDeleteMutate(itemId);
  };

  const onRegionSelect = async (region: RegionType) => {
    onChangeSelectedRegion(region);
  };

  return (
    <Modal onClose={closeRegionModal}>
      <ModalHeader $isRegionAddModal={isRegionAddModal}>
        <ModalTitle>동네 설정</ModalTitle>
        <Button
          style={{ padding: "12px", width: "48px", height: "48px" }}
          variant="plain"
          onClick={closeRegionModal}>
          <img src={xIcon} alt="close" />
        </Button>
      </ModalHeader>
      <RegionModalContent>
        <ContentNotice>
          {"지역은 최소1개,"}
          <br />
          {"최대 2개까지 설정 가능해요."}
        </ContentNotice>
        <ButtonsContainer>
          {userRegionList.map((item, index) => (
            <Button
              style={{
                flexDirection: "row",
                opacity:
                  !selectedRegion.id || selectedRegion.id === item.id ? 1 : 0.3,
              }}
              key={index}
              onClick={() => onRegionSelect(item)}>
              <RegionButtonText>
                {parseNeighborhood(item.title)}
              </RegionButtonText>
              <CircleXFilled
                src={circleXFilled}
                alt="close"
                onClick={(e) => onRegionDelete(e, item.id)}
              />
            </Button>
          ))}
          <Button
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: "56px",
            }}
            variant="outlined"
            size="L"
            onClick={onOpenRegionSelectModal}>
            <img src={plus} alt="plus" />
            <AddButtonText>추가</AddButtonText>
          </Button>
        </ButtonsContainer>
      </RegionModalContent>
    </Modal>
  );
}

const CircleXFilled = styled.img`
  width: 24px;
  height: 24px;
  filter: ${({ theme: { filter } }) => filter.accentText};
`;

export const RegionModalContent = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const ContentNotice = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 32px;
  text-align: center;
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const RegionButtonText = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.accent.text};
`;

const AddButtonText = styled.div`
  height: 24px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.accent.textStrong};
`;
