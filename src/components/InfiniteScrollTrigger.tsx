import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

type Props = {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;
};

export const InfiniteScrollTrigger: React.FC<Props> = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(([first]) => {
      if (first?.isIntersecting) {
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
      {isFetchingNextPage && <Loader />}
    </TriggerDiv>
  );
};

const TriggerDiv = styled.div`
  height: 10px;
`;
