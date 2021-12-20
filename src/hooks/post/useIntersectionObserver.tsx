import useDidUpdateEffect from 'hooks/common/useDidUpdateEffect';
import { RefObject, useEffect, useState } from 'react';
import useDebounce from '../common/useDebounce';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.5, root = null, rootMargin = '0%' }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const debouncedEntry = useDebounce({ value: entry, delay: 200 });

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

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin]);

  return debouncedEntry;
}

export default useIntersectionObserver;
