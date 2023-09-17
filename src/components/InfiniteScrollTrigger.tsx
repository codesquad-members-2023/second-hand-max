import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { GetRegionsResponse } from 'apis/region/types';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

type Props = {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<GetRegionsResponse, unknown>>;
};

export const InfiniteScrollTrigger: React.FC<Props> = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([first]) => {
      if (first?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    const ref = loadMoreRef.current;

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <TriggerDiv ref={loadMoreRef}>
      {isFetchingNextPage ? <Loader /> : null}
    </TriggerDiv>
  );
};

const TriggerDiv = styled.div`
  height: 56px;
`;
