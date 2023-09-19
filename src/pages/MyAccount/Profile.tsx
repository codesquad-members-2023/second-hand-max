import { css, styled } from 'styled-components';
import Button from '@components/Button';
import ProfileImageUploader from '@components/ProfileImageUploader';
import { signOutUser } from 'apis/auth';
import { useImageFileHandler } from '@hooks/useImageFileHandler';
import { useUserStore } from 'stores/useUserStore';
import { updateUserProfileImage } from 'apis/user';

const Profile: React.FC = () => {
  const userReset = useUserStore(({ reset }) => reset);
  const user = useUserStore(({ user }) => user);
  const initialImageSrc = user?.profileUrl;
  const { imageSrc, onImageChange } = useImageFileHandler(initialImageSrc);

  const onProfileImageChange = async (file: File) => {
    onImageChange(file);
    const { message } = await updateUserProfileImage(file);
    alert(message);
  };

  const onLogout = () => {
    signOutUser();
    userReset();
    alert('로그아웃 되었습니다.');
  };

  return (
    <ColumnLayout>
      <h2 className="blind">프로필</h2>

      <UserProfile>
        <ProfileImageUploader
          {...{ imageSrc, onImageChange: onProfileImageChange }}
        />
        <UserName>{user?.loginId || '사용자 이름'}</UserName>
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
