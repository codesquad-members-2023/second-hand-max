import { css, styled } from 'styled-components';

import Button from '@components/Button';
import ProfileImageButton from '@components/ProfileImageButton';

const Profile: React.FC = () => {
  return (
    <ColumnLayout>
      <h2 className="blind">프로필</h2>

      <UserProfile>
        <ProfileImageButton image="https://yt3.ggpht.com/yti/AOXPAcU8rxU7kN4l9ZeFEPPrsxF9rr2eM7tlXnqqgAHoCA=s88-c-k-c0x00ffffff-no-rj" />
        <UserName>khundi</UserName>
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
