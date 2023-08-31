import { css, styled } from 'styled-components';

import Icons from '@design/Icons';
import Button from './Button';

const ProfileImageButton: React.FC<{ image?: string }> = ({ image }) => {
  return (
    <CircularProfileImage $hasImage={Boolean(image)}>
      <Icons.Camera />
      {image && <Image src={image} alt="프로필 이미지" />}
    </CircularProfileImage>
  );
};

const CircularProfileImage = styled(Button)<{ $hasImage: boolean }>`
  ${({ theme: { colors, radius }, $hasImage }) => css`
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid ${colors.neutral.border};
    background-color: ${colors.neutral.overlay};
    border-radius: ${radius.half};
    overflow: hidden;
    z-index: 1;
    stroke: ${colors.accent.text};

    ${$hasImage &&
    css`
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

export default ProfileImageButton;
