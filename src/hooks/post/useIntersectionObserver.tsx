import { RefObject, useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  isLastPost: boolean,
  { threshold = 0.1, root = null, rootMargin = '20%' }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerOptions = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerOptions);
    observer.observe(node);

    if (isLastPost) {
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, isLastPost]);

  return entry;
}

export default useIntersectionObserver;
