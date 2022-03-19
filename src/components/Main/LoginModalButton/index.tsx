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
  font-weight: 400;
  font-size: 18px;
  padding: 10px 36px;
  background-color: #18a0fb;
  border-radius: 113.374px;
  color: white;
`;

export default LoginModalButton;
