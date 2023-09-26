import { useMemo } from 'react';

export const useImageFileReader = (
  onImageLoadSuccess: (result: string, file: File) => void,
) => {
  const reader = useMemo(() => new FileReader(), []);

  const onImageAdd = (file: File) => {
    reader.onload = ({ target }) => {
      if (target?.result) {
        onImageLoadSuccess(target.result as string, file);
      }
    };

    reader.readAsDataURL(file);
  };

  return { onImageAdd };
};
