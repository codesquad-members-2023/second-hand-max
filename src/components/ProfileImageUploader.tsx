import { css, styled } from 'styled-components';
import Icons from '@design/Icons';
import Button from './Button';
import ACCEPTED_EXTENSIONS from '@constants/ACCEPTED_EXTENSIONS';
import defaultProfileImage from '@assets/default-profile-image.png';

type Props = {
  imageSrc?: string;
  onImageChange: (file: File) => void;
};

const ProfileImageUploader: React.FC<Props> = ({ imageSrc, onImageChange }) => {
  return (
    <CircularProfileImage>
      <Icons.Camera />
      <input
        type="file"
        name="profile"
        accept={ACCEPTED_EXTENSIONS.PROFILE_IMAGE}
        onChange={({ target }) => {
          const file = target.files?.[0];

          if (file) {
            onImageChange(file);
          }
        }}
      />
      {<Image src={imageSrc || defaultProfileImage} alt="프로필 이미지" />}
    </CircularProfileImage>
  );
};

const CircularProfileImage = styled(Button)`
  ${({ theme: { colors, radius } }) => css`
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid ${colors.neutral.border};
    background-color: ${colors.neutral.overlay};
    border-radius: ${radius.half};
    overflow: hidden;
    z-index: 1;
    stroke: ${colors.accent.text};

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${colors.neutral.overlay};
      z-index: -1;
    }
  `}
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
`;

export default ProfileImageUploader;
