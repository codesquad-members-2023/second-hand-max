import { css, styled } from 'styled-components';
import Button from '@components/Button';
import ProfileImageUploader from '@components/ProfileImageUploader';
import { useUserStore } from 'stores/useUserStore';
import { useTokenStore } from 'stores/useTokenStore';
import { signOutUser } from 'apis/auth';
import { useImageFileHandler } from '@hooks/useImageFileHandler';
import { useEffect } from 'react';

const Profile: React.FC = () => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();
  const initialImageSrc = userStore.user?.profileUrl;
  const { imageSrc, file, onImageChange } =
    useImageFileHandler(initialImageSrc);

  useEffect(() => {
    // TODO: 프로필 이미지 변경 요청
  }, [file]);

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
        <ProfileImageUploader {...{ imageSrc, onImageChange }} />
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
