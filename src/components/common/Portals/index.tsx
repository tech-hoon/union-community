import { FC, useState, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';

const Portal: FC = memo(({ children }) => {
  const [container] = useState(() => {
    const el = document.createElement('div');
    el.classList.add('portal');
    return el;
  });

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
});

export default Portal;
