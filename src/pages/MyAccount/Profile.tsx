import { css, styled } from 'styled-components';
import Button from '@components/Button';
import ProfileImageButton from '@components/ProfileImageButton';
import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { User } from 'apis/types';
import { signOutUser } from 'apis/fetchApi';

const Profile: React.FC = () => {
  const userLocalData = localStorage.getItem(LOCAL_STORAGE_KEY.USER);
  const user: User | null = userLocalData && JSON.parse(userLocalData);

  const onFileChange = () => {
    // TODO: 프로필 사진 변경 핸들러 구현하기
  };

  const onLogout = () => {
    try {
      signOutUser();
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKENS);
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER);

    // 토큰을 전역 상태로 가지고 있는 방법 구상중...
  };

  return (
    <ColumnLayout>
      <h2 className="blind">프로필</h2>

      <UserProfile>
        <ProfileImageButton
          onFileChange={onFileChange}
          image={user?.profileUrl}
        />
        <UserName>{user?.loginId}</UserName>
      </UserProfile>

      <Button
        className="logout-button"
        $flexible="Fixed"
        $type="Contained"
        onClick={onLogout}
      >
        로그아웃
      </Button>
    </ColumnLayout>
  );
};

const ColumnLayout = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .logout-button {
    ${({ theme: { fonts } }) => css`
      width: 100%;
      ${fonts.available.strong16};
    `}
  }
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const UserName = styled.div`
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

export default Profile;
