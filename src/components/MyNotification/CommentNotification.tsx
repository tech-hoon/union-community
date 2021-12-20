import S from 'components/NotificationLayout/Layouts';
import { useHistory } from 'react-router-dom';
import { NotificationType, UserType } from 'types';
import { Comment } from '@styled-icons/fa-regular';
import Avatar from 'components/common/Avatar';
import { toDateStringByFormating } from 'utils/date';
import styled from 'styled-components';
import useNotification from 'hooks/useNotification';

const CommentNotification = () => {
  const { notifications, onDeleteNotification, onDeleteAllNotification } = useNotification();

  const history = useHistory();

  const onClickVisit = (link: string) => {
    history.push(link);
  };

  return (
    <>
      {!!notifications.length && (
        <S.DeleteAllButton onClick={onDeleteAllNotification}>모두 지우기</S.DeleteAllButton>
      )}

      <S.Wrapper>
        {notifications.length ? (
          notifications.map(
            (
              {
                text,
                created_at,
                sender: { nickname, avatar_id, uid },
                is_secret,
                id,
                link,
                post_title,
              }: any,
              key
            ) => (
              <S.Message key={key} onClick={() => onClickVisit(link)}>
                <S.DeleteButton id={id} onClick={(e) => onDeleteNotification(e, uid)} />
                <S.Row1>
                  <S.IconWrapper>
                    <Comment size='16px' />
                  </S.IconWrapper>
                  <S.Title>
                    <small>{post_title}</small>
                    게시물에 댓글이 달렸습니다.
                  </S.Title>
                </S.Row1>
                <S.Row2>
                  <AvatarWrapper>
                    <Avatar avatarId={is_secret ? -1 : avatar_id} size={28} />
                    <S.Creator>{is_secret ? `익명${uid.slice(-2)}` : nickname}</S.Creator>
                  </AvatarWrapper>
                  <S.Content>{text}</S.Content>
                </S.Row2>
                <S.Row3>
                  <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
                </S.Row3>
              </S.Message>
            )
          )
        ) : (
          <S.Text>소식이 없습니다.</S.Text>
        )}
      </S.Wrapper>
    </>
  );
};

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default CommentNotification;
