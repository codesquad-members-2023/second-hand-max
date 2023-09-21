import { useRef, useState } from 'react';

type UseDraggableReturnType = {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  onDragStart: (e: React.MouseEvent) => void;
  onDragMove: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
};

export const useDraggable = (): UseDraggableReturnType => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (isDragging && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += startX - e.clientX;
      setStartX(e.clientX);
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return {
    scrollContainerRef,
    onDragStart,
    onDragMove,
    onDragEnd,
  };
};
