import S from 'components/NotificationLayout/Layouts';
import { useHistory } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import { toDateStringByFormating } from 'utils/date';
import styled from 'styled-components';
import useNotification from 'hooks/useNotification';
import KebabMenu from 'components/common/KebabMenu';

const CommentNotification = () => {
  const { notifications, onDeleteNotification, onDeleteAllNotification } = useNotification();
  const history = useHistory();

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const link = (e.currentTarget as HTMLElement).dataset.id;
    link && history.push(link);
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
              <S.Message key={key} data-id={link} onClick={onClickHandler}>
                <Title>
                  <small>{post_title}</small>
                  <span>게시물에 댓글이 달렸습니다.</span>
                  <KebabMenu>
                    {[
                      <S.DeleteBtn id={id} key={key} onClick={(e) => onDeleteNotification(e, uid)}>
                        삭제하기
                      </S.DeleteBtn>,
                    ]}
                  </KebabMenu>
                </Title>

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
          <S.Text>알림이 없습니다.</S.Text>
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

const Title = styled(S.Title)`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;

  margin: 12px;
  gap: 2px;
  line-height: 1.1;

  & small {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;

    @media ${({ theme }) => theme.size.mobile} {
      max-width: 30%;
    }
  }

  & span {
    margin-right: auto;
  }
`;

export default CommentNotification;
