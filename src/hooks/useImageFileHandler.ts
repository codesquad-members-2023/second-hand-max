import { useMemo, useState } from 'react';

export const useImageFileHandler = (initialImageSrc?: string) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [file, setFile] = useState<File>();
  const reader = useMemo(() => new FileReader(), []);

  const onImageChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    if (file) {
      reader.onload = ({ target }) => {
        if (target?.result) {
          setImageSrc(target.result as string);
        }
      };

      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  return { imageSrc, file, onImageChange };
};
