import { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  sentinelRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const useAnimationPhase = ({ sentinelRef }: Props) => {
  const [minimized, setMinimized] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const isMobile = useRef(false);
  const scrollUpCheck = useRef(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!entries[0].isIntersecting) {
        setAnimationPhase(1);
        setMinimized(true);
      } else if (scrollUpCheck.current) {
        setAnimationPhase(3);
      }
    },
    []
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [1.0],
      rootMargin: "0px 0px 0px 0px",
    });

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, [sentinelRef, handleIntersect]);

  useEffect(() => {
    if (animationPhase === 1) {
      setTimeout(() => {
        setAnimationPhase(2);
      }, 500);
    } else if (animationPhase === 2) {
      setTimeout(() => {
        scrollUpCheck.current = true;
      }, 200);
    } else if (animationPhase === 3) {
      setTimeout(() => {
        isMobile.current = false;
        setAnimationPhase(4);
      }, 500);
    } else if (animationPhase === 4) {
      setTimeout(() => {
        scrollUpCheck.current = false;
        setMinimized(false);
        setAnimationPhase(0);
      }, 200);
    }
  }, [animationPhase]);

  return {
    animationPhase,
    minimized,
    isMobile,
    setMinimized,
    setAnimationPhase,
  };
};
