import styled from 'styled-components';
import { PictureList } from './PictureList';
import { useUserStore } from 'stores/useUserStore';

export const Main: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);

  return (
    <StyledMain>
      <PictureList />
      <TitleInput placeholder={'제목을 입력하세요.'} />
      <PriceInput placeholder={'가격(선택사항)'} />
      <ContentInput
        placeholder={`${currentRegion.addressName}에 올릴 게시물을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)`}
      />
    </StyledMain>
  );
};

const StyledMain = styled.div`
  margin: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const TitleInput = styled.input``;

const PriceInput = styled.input``;

const ContentInput = styled.textarea`
  height: 100%;
`;
