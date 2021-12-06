import { FC, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal: FC = ({ children }) => {
  const [container] = useState(() => {
    const el = document.createElement('div');
    el.classList.add('portal');
    return el;
  });

  useEffect(() => {
    document.body.style.cssText = 'overflow:hidden';
    document.body.appendChild(container);
    return () => {
      document.body.style.cssText = 'overflow:auto';
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
