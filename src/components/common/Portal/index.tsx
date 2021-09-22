import ReactDOM from 'react-dom';
import React, { memo } from 'react';

interface Props {}

const Portal: React.FC<Props> = memo(({ children }) => {
  const el = document.querySelector('#portal') as HTMLElement;
  return ReactDOM.createPortal(children, el);
});

export default Portal;
