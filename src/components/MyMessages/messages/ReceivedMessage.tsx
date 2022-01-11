import { UserType } from 'types';
import { Envelope } from '@styled-icons/boxicons-regular';
import { toDateStringByFormating } from 'utils/date';

import Avatar from 'components/common/Avatar';
import S from 'components/NotificationLayout/Layouts';
import useReceivedMessage from 'hooks/message/useReceivedMessage';
import styled from 'styled-components';
import { urlParsingRegex } from 'utils/regex';

interface Props {
  onClickModal: (user: UserType, isSecret: boolean) => void;
}

const ReceivedMessage = ({ onClickModal }: Props) => {
  const { messages, onDeleteMessage, onDeleteAllMessages } = useReceivedMessage();

  return (
    <>
      {!!messages.length && (
        <S.DeleteAllButton onClick={onDeleteAllMessages}>모두 지우기</S.DeleteAllButton>
      )}
      <S.Wrapper>
        {messages.length ? (
          messages.map(
            ({
              text,
              created_at,
              user,
              user: { nickname, uid, avatar_id },
              is_secret,
              id,
            }: any) => (
              <S.Message key={id} onClick={() => onClickModal(user, is_secret)}>
                <S.Row1>
                  <S.DeleteButton id={id} onClick={(e) => onDeleteMessage(e, uid)} />
                  <S.IconWrapper>
                    <Envelope size='20px' />
                  </S.IconWrapper>
                  <S.Title>
                    <small>{is_secret ? `익명${uid.slice(-2)}` : nickname}</small>
                    님의 메시지가 도착했습니다.
                  </S.Title>
                </S.Row1>
                <S.Row2>
                  <ContentWrapper>
                    <AvatarWrapper>
                      <Avatar avatarId={is_secret ? -1 : avatar_id} size={30} />
                    </AvatarWrapper>
                    <S.Content dangerouslySetInnerHTML={{ __html: urlParsingRegex(text) }} />
                  </ContentWrapper>
                </S.Row2>
                <S.Row3>
                  <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
                </S.Row3>
              </S.Message>
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
