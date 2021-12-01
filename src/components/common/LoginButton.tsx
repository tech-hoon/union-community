import styled from 'styled-components';
import LoginModal from 'components/common/Portals/LoginModal';
import { useState } from 'react';

interface Props {}

const LoginButton = (props: Props) => {
  const [modalOpened, setModalOpened] = useState(false);
  const handleModal = () => setModalOpened(!modalOpened);

  return (
    <>
      <Button onClick={handleModal}>시작하기</Button>
      {modalOpened && <LoginModal onClose={handleModal} />}
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
