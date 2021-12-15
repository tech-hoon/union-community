import { NotificationType, UserType } from 'types';
import N from './Layouts';

import useModal from 'hooks/common/useModal';
import PortalContainer from 'components/common/Portal/PortalContainer';
import UserMenuModal from 'components/common/Portal/UserMenuModal';

interface Props {
  notification: NotificationType;
}

const MessageNofitication = ({ notification: { text, created_at, sender, is_secret } }: Props) => {
  const { nickname, uid } = sender as UserType;
  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  return (
    <>
      <N.Wrapper>
        <N.Row1>
          <N.Title>
            <small>{is_secret ? `익명${uid.slice(-2)}` : nickname}</small>님의 메시지가
            도착했습니다.
          </N.Title>
          <N.Button onClick={onOpenUserMenu}>답장하기</N.Button>
        </N.Row1>
        <N.Row2>
          <N.Content>{text}</N.Content>
        </N.Row2>
      </N.Wrapper>

      {userMenuOpened && (
        <PortalContainer onClose={onCloseUserMenu}>
          <UserMenuModal
            reciever={sender as UserType}
            onCloseModal={onCloseUserMenu}
            isSecret={is_secret}
          />
        </PortalContainer>
      )}
    </>
  );
};

export default MessageNofitication;
