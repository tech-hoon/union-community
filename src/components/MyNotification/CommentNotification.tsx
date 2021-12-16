import s from 'components/NotificationLayout/Layouts';
import { useHistory } from 'react-router-dom';
import { NotificationType, UserType } from 'types';
import { Comment } from '@styled-icons/fa-regular';
import Avatar from 'components/common/Avatar';
import { toDateStringByFormating } from 'utils/date';

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
    <s.Message>
      <s.DeleteButton id={id} onClick={onDelete} />
      <s.Row1>
        <s.IconWrapper>
          <Comment size='24px' />
        </s.IconWrapper>
        <s.Title>
          <small>{post_title}</small>
          게시물에 댓글이 달렸습니다.
        </s.Title>
        <s.CreatedAt>{toDateStringByFormating(created_at)}</s.CreatedAt>
      </s.Row1>
      <s.Row2>
        <Avatar avatarId={is_secret ? -1 : avatar_id} />
        <s.Creator>{is_secret ? `익명${uid.slice(-2)}` : nickname}</s.Creator>
        <s.Content>{text}</s.Content>
        <s.Button onClick={onClickVisit}>보러가기</s.Button>
      </s.Row2>
    </s.Message>
  );
};

export default CommentNotification;
