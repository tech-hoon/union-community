import N from './Layouts';
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
    <N.Wrapper>
      <N.DeleteButton id={id} onClick={onDelete} />
      <N.Row1>
        <N.IconWrapper>
          <Comment size='24px' />
        </N.IconWrapper>
        <N.Title>
          <small>{post_title}</small>
          게시물에 댓글이 달렸습니다.
        </N.Title>
        <N.CreatedAt>{toDateStringByFormating(created_at)}</N.CreatedAt>
      </N.Row1>
      <N.Row2>
        <Avatar avatarId={is_secret ? -1 : avatar_id} />
        <N.Creator>{is_secret ? `익명${uid.slice(-2)}` : nickname}</N.Creator>
        <N.Content>{text}</N.Content>
        <N.Button onClick={onClickVisit}>보러가기</N.Button>
      </N.Row2>
    </N.Wrapper>
  );
};

export default CommentNotification;
