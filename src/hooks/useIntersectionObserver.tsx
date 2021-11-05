import { RefObject, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { postsLastKey } from 'store/post';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '10%', freezeOnceVisible = false }: Args,
  lastKey: any,
  callback: (key: any) => void
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    entry.isIntersecting && callback(lastKey);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerOptions = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerOptions);
    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

export default useIntersectionObserver;
