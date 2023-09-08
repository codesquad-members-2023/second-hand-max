import { css, styled } from 'styled-components';
import Button from '@components/Button';
import ProfileImageButton from '@components/ProfileImageButton';
import { LOCAL_STORAGE_KEY } from '@constants/LOCAL_STORAGE_KEY';
import { User } from 'apis/types';

const Profile: React.FC = () => {
  const onFileChange = () => {
    // TODO: 프로필 사진 변경 핸들러 구현하기
  };

  const userLocalData = localStorage.getItem(LOCAL_STORAGE_KEY.USER);
  const user: User | null = userLocalData && JSON.parse(userLocalData);

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

      <Button className="logout-button" $flexible="Fixed" $type="Contained">
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
