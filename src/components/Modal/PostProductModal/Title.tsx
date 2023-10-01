import { BackButton as BackButtonStyle } from '@components/BackButton';
import TopBarStyle from '@components/TopBar';
import { useProductPostMutation } from '@hooks/queries/useProductPostMutation';
import { useModalStore } from 'stores/useModalStore';
import styled, { css } from 'styled-components';
import { usePostProductModalStore } from './usePostProductModalStore';
import { useUserStore } from 'stores/useUserStore';

export const Title: React.FC = () => {
  const closePostProductModal = useModalStore(
    ({ closePostProductModal }) => closePostProductModal,
  );

  const images = usePostProductModalStore(({ images }) => images);
  const thumbnailId = usePostProductModalStore(
    ({ thumbnailId }) => thumbnailId,
  );
  const title = usePostProductModalStore(({ title }) => title);
  const price = usePostProductModalStore(({ price }) => price);
  const content = usePostProductModalStore(({ content }) => content);
  const selectCategory = usePostProductModalStore(
    ({ selectCategory }) => selectCategory,
  );
  const postProductModalStoreReset = usePostProductModalStore(
    ({ reset }) => reset,
  );

  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);

  const { mutate: postProduct } = useProductPostMutation();

  const onSubmitProduct = () => {
    const thumbnailImage = images!.find(({ id }) => id === thumbnailId)!
      .imageFile!;
    const imagesWithoutThumbnail = images!
      .filter(({ id }) => id !== thumbnailId)
      .map(({ imageFile }) => imageFile);

    postProduct({
      thumbnailImage,
      images: imagesWithoutThumbnail,
      title,
      price,
      content,
      region: currentRegion.addressName,
      status: '판매중',
      categoryId: selectCategory!.id,
      categoryName: selectCategory!.name,
    });
  };

  const canSubmit = !!(
    title &&
    selectCategory?.id &&
    images?.some(({ id }) => id === thumbnailId)
  );

  return (
    <TopBar>
      <BackButton
        onClick={() => {
          closePostProductModal();
          postProductModalStoreReset();
        }}
      >
        닫기
      </BackButton>
      <div>내 물건 팔기</div>
      <SubmitButton onClick={onSubmitProduct} disabled={!canSubmit}>
        완료
      </SubmitButton>
    </TopBar>
  );
};

const TopBar = styled(TopBarStyle)`
  ${({ theme: { fonts } }) => css`
    justify-content: space-between;
    ${fonts.available.strong16};
    padding: 8px;
  `};
`;

const BackButton = styled(BackButtonStyle)`
  position: static;
`;

const SubmitButton = styled(BackButtonStyle)`
  ${({ theme: { fonts } }) => css`
    ${fonts.available.strong16};
    position: static;
  `};
`;
