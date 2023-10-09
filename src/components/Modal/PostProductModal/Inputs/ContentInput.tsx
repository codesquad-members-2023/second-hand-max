import styled from 'styled-components';
import { usePostProductModalStore } from '../usePostProductModalStore';
import { useUserStore } from 'stores/useUserStore';

export const ContentInput: React.FC = () => {
  const addressName = useUserStore(
    ({ currentRegion }) => currentRegion.addressName,
  );

  const content = usePostProductModalStore(({ content }) => content);
  const setContent = usePostProductModalStore(({ setContent }) => setContent);

  return (
    <StyledContentInput
      placeholder={`${addressName}에 올릴 게시물을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)`}
      value={content}
      onChange={({ target }) => setContent(target.value)}
    />
  );
};

const StyledContentInput = styled.textarea`
  height: 100%;
`;
