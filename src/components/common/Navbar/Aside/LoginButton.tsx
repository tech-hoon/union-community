import styled from 'styled-components';
import LoginPortal from 'components/common/Portals/LoginPortal';
import { useState } from 'react';

interface Props {}

const LoginButton = (props: Props) => {
  const [portalClicked, setPortalClicked] = useState(false);
  const handlePortal = () => setPortalClicked(!portalClicked);

  return (
    <>
      <Button onClick={handlePortal}>로그인</Button>
      {portalClicked && <LoginPortal onClose={handlePortal} />}
    </>
  );
};

const Button = styled.button`
  font-family: 'Spoqa medium';
  font-size: 1.2em;
`;

export default LoginButton;
