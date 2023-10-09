import styled from 'styled-components';
import { usePostProductModalStore } from '../usePostProductModalStore';

export const TitleInput: React.FC = () => {
  const title = usePostProductModalStore(({ title }) => title);
  const setTitle = usePostProductModalStore(({ setTitle }) => setTitle);

  return (
    <StyledTitleInput
      placeholder={'제목을 입력하세요.'}
      value={title}
      onChange={({ target }) => setTitle(target.value)}
    ></StyledTitleInput>
  );
};

const StyledTitleInput = styled.input``;
