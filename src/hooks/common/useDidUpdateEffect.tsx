import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

function useDidUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      return effect();
    }
  }, deps);
}

export default useDidUpdateEffect;
