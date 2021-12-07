import styled from 'styled-components';
import PortalContainer from 'components/common/Portal/PortalContainer';
import useModal from 'hooks/common/useModal';
import LoginModal from './LoginModal';

interface Props {}

const LoginModalButton = (props: Props) => {
  const { modalOpened, onCloseModal, onOpenModal } = useModal();

  return (
    <>
      <Button onClick={onOpenModal}>시작하기</Button>
      {modalOpened && (
        <PortalContainer onClose={onCloseModal}>
          <LoginModal onClose={onCloseModal} />
        </PortalContainer>
      )}
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

export default LoginModalButton;
