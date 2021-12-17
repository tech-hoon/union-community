import S from 'components/NotificationLayout/Layouts';
import { useHistory } from 'react-router-dom';
import { NotificationType, UserType } from 'types';
import { Comment } from '@styled-icons/fa-regular';
import Avatar from 'components/common/Avatar';
import { toDateStringByFormating } from 'utils/date';
import styled from 'styled-components';

interface Props {
  notification: NotificationType;
  onDelete: React.MouseEventHandler<HTMLElement>;
}

const CommentNotification = ({
  notification: { text, created_at, sender, link, post_title, is_secret, id },
  onDelete,
}: Props) => {
  const history = useHistory();
  const { nickname, uid, avatar_id } = sender as UserType;

  const onClickVisit = () => {
    history.push(link as string);
  };

  return (
    <S.Message>
      <S.DeleteButton id={id} onClick={onDelete} />
      <S.Row1>
        <S.IconWrapper>
          <Comment size='24px' />
        </S.IconWrapper>
        <S.Title>
          <small>{post_title}</small>
          게시물에 댓글이 달렸습니다.
        </S.Title>
        <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
      </S.Row1>
      <S.Row2>
        <Avatar avatarId={is_secret ? -1 : avatar_id} size={28} />
        <S.Creator>{is_secret ? `익명${uid.slice(-2)}` : nickname}</S.Creator>
        <S.Content>{text}</S.Content>
        <S.Button onClick={onClickVisit}>보러가기</S.Button>
      </S.Row2>
    </S.Message>
  );
};

const AvatarWrapper = styled.div`
  width: 20px;
`;

export default CommentNotification;
