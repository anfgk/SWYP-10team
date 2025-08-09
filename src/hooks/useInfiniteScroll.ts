import { useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (callback: () => void) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) callback();
    },
    [callback],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerCallback]);

  return observerRef;
};

export { useInfiniteScroll };
