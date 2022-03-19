import { debounce } from 'lodash';
import { useEffect } from 'react';

const useScreenHeightResize = () => {
  const handleResize = debounce(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, 500);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

export default useScreenHeightResize;
