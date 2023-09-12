import { css, styled } from 'styled-components';
import Button from '@components/Button';
import ProfileImageButton from '@components/ProfileImageButton';
import { useUserStore } from 'stores/useUserStore';
import { useTokenStore } from 'stores/useTokenStore';
import { signOutUser } from 'apis/auth';

const Profile: React.FC = () => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  const onFileChange = () => {
    // TODO: 프로필 사진 변경 핸들러 구현하기
  };

  const onLogout = () => {
    try {
      signOutUser();
    } catch (error) {
      console.error(error);
    }

    tokenStore.reset();
    userStore.reset();
    alert('로그아웃 되었습니다.');
  };

  return (
    <ColumnLayout>
      <h2 className="blind">프로필</h2>

      <UserProfile>
        <ProfileImageButton
          {...{ onFileChange, initialImageSrc: userStore.user?.profileUrl }}
        />
        <UserName>{userStore.user?.loginId}</UserName>
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
