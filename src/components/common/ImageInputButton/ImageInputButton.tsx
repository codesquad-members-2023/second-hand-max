import cameraIcon from "@assets/icon/camera.svg";
import { zInput } from "@styles/constants/zIndex";
import { ChangeEvent } from "react";
import styled from "styled-components";

type Props = {
  numUploadedImages: number;
  maxNumImages: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function ImageInputButton({
  numUploadedImages,
  maxNumImages,
  onChange,
}: Props) {
  return (
    <StyledImageInputButton>
      <Label>
        <Input type="file" accept="image/*" onChange={onChange} />
      </Label>
      <img src={cameraIcon} alt="camera" />
      <ImagesCount>
        {numUploadedImages}/{maxNumImages}
      </ImagesCount>
    </StyledImageInputButton>
  );
}

const StyledImageInputButton = styled.button`
  width: 80px;
  height: 80px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 4px;
  border: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 16px;
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
`;

const Input = styled.input`
  visibility: hidden;
  width: inherit;
  height: inherit;
  z-index: ${zInput};
`;

const ImagesCount = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;
