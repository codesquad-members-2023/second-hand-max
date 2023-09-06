import { useMemo, useState } from 'react';
import { css, styled } from 'styled-components';
import Icons from '@design/Icons';
import Button from './Button';
import ACCEPTED_EXTENSIONS from '@constants/ACCEPTED_EXTENSIONS';

const ProfileImageButton: React.FC<{
  onFileChange: (file: File) => void;
}> = ({ onFileChange }) => {
  const [imageSrc, setImageSrc] = useState('');
  const reader = useMemo(() => new FileReader(), []);

  return (
    <CircularProfileImage $hasImage={!!imageSrc}>
      <Icons.Camera />
      <input
        type="file"
        name="profile"
        accept={ACCEPTED_EXTENSIONS.PROFILE_IMAGE}
        onChange={({ target }) => {
          const file = target.files?.[0] ?? null;

          if (file) {
            reader.onload = ({ target }) => {
              if (target && target.result) {
                setImageSrc(target.result as string);
              }
            };

            onFileChange(file);
            reader.readAsDataURL(file);
          }
        }}
      />
      {imageSrc && <Image src={imageSrc} alt="프로필 이미지" />}
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
