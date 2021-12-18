import { Envelope } from '@styled-icons/boxicons-regular';
import { toDateStringByFormating } from 'utils/date';
import styled from 'styled-components';
import S from 'components/NotificationLayout/Layouts';
import useSentMessage from 'hooks/message/useSentMessage';

const SentMessage = () => {
  const { messages, onDeleteMessage, onDeleteAllMessages } = useSentMessage();

  return (
    <>
      {!!messages.length && (
        <S.DeleteAllButton onClick={onDeleteAllMessages}>모두 지우기</S.DeleteAllButton>
      )}

      <S.Wrapper>
        {messages.length ? (
          messages.map(({ text, created_at, user: { nickname, uid }, is_secret, id }: any) => (
            <S.Message key={id}>
              <S.Row1>
                <S.DeleteButton id={id} onClick={(e) => onDeleteMessage(e, uid)} />
                <S.IconWrapper>
                  <Envelope size='20px' />
                </S.IconWrapper>
                <S.Title>
                  <small>{is_secret ? `익명${uid.slice(-2)}` : nickname}</small>
                  님에게 메시지를 보냈습니다.
                </S.Title>
              </S.Row1>
              <S.Row2>
                <Content>{text}</Content>
              </S.Row2>
              <S.Row3>
                <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
              </S.Row3>
            </S.Message>
          ))
        ) : (
          <S.Text>보낸 메시지가 없습니다.</S.Text>
        )}
      </S.Wrapper>
    </>
  );
};

const Content = styled(S.Content)`
  margin-left: 12px;
`;

export default SentMessage;
