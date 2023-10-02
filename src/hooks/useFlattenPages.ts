import { InfiniteData } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFlattenPages = <T>(data?: InfiniteData<T[]>): T[] => {
  return useMemo(
    () => (data && data.pages ? data.pages.flatMap((page) => page) : []),
    [data],
  );
};
