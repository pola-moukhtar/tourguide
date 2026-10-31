import { useCallback, useState } from 'react';

export function useCarousel(itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const index = itemCount > 0 ? Math.min(activeIndex, itemCount - 1) : 0;

  const next = useCallback(() => {
    if (itemCount < 2) return;
    setActiveIndex((current) => (current + 1) % itemCount);
  }, [itemCount]);

  const previous = useCallback(() => {
    if (itemCount < 2) return;
    setActiveIndex((current) => (current - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goTo = useCallback((targetIndex: number) => {
    if (itemCount < 1) return;
    setActiveIndex(Math.min(Math.max(targetIndex, 0), itemCount - 1));
  }, [itemCount]);

  return { index, next, previous, goTo };
}
