import N from './Layouts';
import { NotificationType, UserType } from 'types';
import { Envelope } from '@styled-icons/boxicons-regular';
import { toDateStringByFormating } from 'utils/date';

import useModal from 'hooks/common/useModal';
import PortalContainer from 'components/common/Portal/PortalContainer';
import UserMenuModal from 'components/common/Portal/UserMenuModal';
import Avatar from 'components/common/Avatar';

interface Props {
  notification: NotificationType;
  onDelete: React.MouseEventHandler<HTMLElement>;
}

const MessageNofitication = ({
  notification: { text, created_at, sender, is_secret, id },
  onDelete,
}: Props) => {
  const { nickname, uid, avatar_id } = sender as UserType;
  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  return (
    <>
      <N.Wrapper>
        <N.Row1>
          <N.DeleteButton id={id} onClick={onDelete} />
          <N.IconWrapper>
            <Envelope size='28px' />
          </N.IconWrapper>
          <N.Title>
            <small>{is_secret ? `익명${uid.slice(-2)}` : nickname}</small>
            님의 메시지가 도착했습니다.
          </N.Title>
          <N.CreatedAt>{toDateStringByFormating(created_at)}</N.CreatedAt>
        </N.Row1>
        <N.Row2>
          <Avatar avatarId={is_secret ? -1 : avatar_id} />
          <N.Creator>{is_secret ? `익명${uid.slice(-2)}` : nickname}</N.Creator>
          <N.Content>{text}</N.Content>
          <N.Button onClick={onOpenUserMenu}>답장하기</N.Button>
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
