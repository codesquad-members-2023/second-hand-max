import { useState } from 'react';
import { styled } from 'styled-components';
import ProfileImageUploader from '@components/ProfileImageUploader';
import { InitOAuthType } from '@hooks/useOAuth';
import { useImageFileHandler } from '@hooks/useImageFileHandler';
import { SignUpFormTitle } from './SignUpFormTitle';
import { SignUpField } from './SignUpField';
import { AddRegionButton } from './AddRegionButton';
import { AddRegionModal } from '@components/Modal/RegionSettingModal/AddRegionModal';
import { Address } from 'types/region';
import { AddedRegionItem } from '@components/Modal/AddedRegionItem';

const SignUpForm: React.FC<{ initOAuth: InitOAuthType }> = ({ initOAuth }) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const [file, setFile] = useState<File>();
  const [id, setId] = useState('');
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<
    Omit<Address, 'fullAddressName' | 'isSelected'>[]
  >([]);

  const onImageLoadSuccess = (result: string, file: File) => {
    setImageSrc(result);
    setFile(file);
  };

  const { onImageChange } = useImageFileHandler(onImageLoadSuccess);

  const onIdChange = (id: string) => {
    setId(id);
  };

  const onAddRegionModalOpen = () => setIsAddRegionModalOpen(true);
  const onAddRegionModalClose = () => setIsAddRegionModalOpen(false);

  const addAddress = ({ addressId, addressName }: Address) =>
    setAddresses((addresses) => [...addresses, { addressId, addressName }]);

  const deleteAddress = (targetId: number) =>
    setAddresses((addresses) =>
      addresses.filter(({ addressId }) => addressId !== targetId),
    );

  const onSubmit = () => {
    initOAuth({
      action: 'sign-up',
      id,
      file,
      addressIds: addresses.map(({ addressId }) => addressId),
    });
  };

  const canSubmit = !!id && addresses.length > 0;
  const canAddRegion = addresses.length < 2;

  return (
    <StyledSignUpPage>
      <SignUpFormTitle {...{ canSubmit, onSubmit }} />
      <ProfileImageUploader {...{ imageSrc, onImageChange }} />
      <SignUpField {...{ id, onIdChange }} />
      <AddedAddresses>
        {addresses?.map((address) => (
          <AddedRegionItem
            key={address.addressId}
            {...{
              addressName: address.addressName,
              onDeleteButtonClick: () => deleteAddress(address.addressId),
            }}
          />
        ))}
      </AddedAddresses>
      <AddRegionButton
        onClick={onAddRegionModalOpen}
        disabled={!canAddRegion}
      />
      {isAddRegionModalOpen && (
        <AddRegionModal
          {...{
            onModalClose: onAddRegionModalClose,
            addRegion: (address) => {
              addAddress(address);
              onAddRegionModalClose();
            },
          }}
        />
      )}
    </StyledSignUpPage>
  );
};

const StyledSignUpPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const AddedAddresses = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default SignUpForm;
