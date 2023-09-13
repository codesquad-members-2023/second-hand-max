import { useState } from 'react';
import { styled } from 'styled-components';
import ProfileImageUploader from '@components/ProfileImageUploader';
import { InitOAuthType } from '@hooks/useOAuth';
import { useImageFileHandler } from '@hooks/useImageFileHandler';
import { SignUpFormTitle } from './SignUpFormTitle';
import { SignUpField } from './SignUpField';
import { AddRegionButton } from './AddRegionButton';

const SignUpForm: React.FC<{ initOAuth: InitOAuthType }> = ({ initOAuth }) => {
  const { imageSrc, file, onImageChange } = useImageFileHandler();
  const [id, setId] = useState('');

  const onIdChange = (id: string) => {
    setId(id);
  };

  return (
    <StyledSignUpPage>
      <SignUpFormTitle {...{ id, file, initOAuth }} />
      <ProfileImageUploader {...{ imageSrc, onImageChange }} />
      <SignUpField {...{ id, onIdChange }} />
      <AddRegionButton />
    </StyledSignUpPage>
  );
};

const StyledSignUpPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  .add-region-button {
  }
`;

export default SignUpForm;
