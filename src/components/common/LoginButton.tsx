import styled from 'styled-components';
import LoginPortal from 'components/common/Portals/LoginPortal';
import { useState } from 'react';

interface Props {}

const LoginButton = (props: Props) => {
  const [portalClicked, setPortalClicked] = useState(false);
  const handlePortal = () => setPortalClicked(!portalClicked);

  return (
    <>
      <Button onClick={handlePortal}>시작하기</Button>
      {portalClicked && <LoginPortal onClose={handlePortal} />}
    </>
  );
};

const Button = styled.button`
  font-weight: 500;
  font-size: 1.2em;

  padding: 12px 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: #18a0fb;
  color: white;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
    padding: 8px 24px;
  }

  &:hover {
    transform: scale(105%);
  }
`;

export default LoginButton;
