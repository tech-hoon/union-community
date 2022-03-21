import { useState, useCallback, useRef, useEffect, memo, ReactNode } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Portal from './Portal';

interface Props {
  onClose: () => void;
  children: ReactNode;
  center?: boolean;
  zIndex?: number;
}

const PortalContainer = ({ onClose, children, center = true, zIndex = 1000 }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const portalRef = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (e) => !portalRef.current?.contains(e.target) && onClose(),
    [onClose]
  );
  const onEscClick = useCallback((e) => e.key === 'Escape' && onClose(), [onClose]);

  useEffect(() => {
    setIsOpened(true);
    window.addEventListener('click', onOutsideClick);
    window.addEventListener('keydown', onEscClick);

    return () => {
      setIsOpened(false);
      window.removeEventListener('click', onOutsideClick);
      window.removeEventListener('keydown', onEscClick);
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta name='theme-color' content={isOpened ? '#7C7C7C' : '#f8f9fa'} />
      </Helmet>
      <Portal>
        <Background zIndex={zIndex}>
          {center ? <Overlay ref={portalRef}>{children}</Overlay> : <>{children}</>}
        </Background>
      </Portal>
    </>
  );
};

const Background = styled.div<{ zIndex: number }>`
  position: fixed;
  z-index: ${({ zIndex }) => zIndex};
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  overflow-y: hidden;
`;
export default memo(PortalContainer);
