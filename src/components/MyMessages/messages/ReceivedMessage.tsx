import { MessageType, UserType } from 'types';
import { Envelope } from '@styled-icons/boxicons-regular';
import { toDateStringByFormating } from 'utils/date';

import useModal from 'hooks/common/useModal';
import PortalContainer from 'components/common/Portal/PortalContainer';
import UserMenuModal from 'components/common/Portal/UserMenuModal';
import Avatar from 'components/common/Avatar';
import S from 'components/NotificationLayout/Layouts';
import useReceivedMessage from 'hooks/message/useReceivedMessage';
import styled from 'styled-components';

const ReceivedMessage = () => {
  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  const { messages, onDeleteMessage, onDeleteAllMessages } = useReceivedMessage();

  return (
    <>
      {!!messages.length && (
        <S.DeleteAllButton onClick={onDeleteAllMessages}>모두 지우기</S.DeleteAllButton>
      )}
      <S.Wrapper>
        {messages.length ? (
          messages.map(
            (
              { text, created_at, user, user: { nickname, uid, avatar_id }, is_secret, id }: any,
              key
            ) => (
              <>
                <S.Message key={key}>
                  <S.Row1>
                    <S.DeleteButton id={id} onClick={(e) => onDeleteMessage(e, uid)} />
                    <S.IconWrapper>
                      <Envelope size='28px' />
                    </S.IconWrapper>
                    <S.Title>
                      <small>{is_secret ? `익명${uid.slice(-2)}` : nickname}</small>
                      님의 메시지가 도착했습니다.
                    </S.Title>
                    <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
                  </S.Row1>
                  <S.Row2>
                    <ContentWrapper>
                      <AvatarWrapper>
                        <Avatar avatarId={is_secret ? -1 : avatar_id} size={30} />
                      </AvatarWrapper>
                      <S.Content>{text}</S.Content>
                    </ContentWrapper>
                    <S.Button onClick={onOpenUserMenu}>답장하기</S.Button>
                  </S.Row2>
                </S.Message>

                {userMenuOpened && (
                  <PortalContainer onClose={onCloseUserMenu}>
                    <UserMenuModal
                      reciever={user as UserType}
                      onCloseModal={onCloseUserMenu}
                      isSecret={is_secret}
                    />
                  </PortalContainer>
                )}
              </>
            )
          )
        ) : (
          <S.Text>받은 메시지가 없습니다.</S.Text>
        )}
      </S.Wrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AvatarWrapper = styled.div`
  flex: 1;
`;

export default ReceivedMessage;
