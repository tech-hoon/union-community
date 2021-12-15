import { useHistory } from 'react-router-dom';
import { NotificationType, UserType } from 'types';
import N from './Layouts';

interface Props {
  notification: NotificationType;
}

const CommentNotification = ({
  notification: { text, created_at, sender, link, post_title, is_secret },
}: Props) => {
  const history = useHistory();
  const { nickname, uid } = sender as UserType;

  const onClickVisit = () => {
    history.push(link as string);
  };

  return (
    <N.Wrapper>
      <N.Row1>
        <N.Title>
          <small>{post_title}</small>
          게시물에 댓글이 달렸습니다.
        </N.Title>
        <N.Button onClick={onClickVisit}>보러가기</N.Button>
      </N.Row1>
      <N.Row2>
        <N.Creator>{is_secret ? `익명${uid.slice(-2)}` : nickname}</N.Creator>
        <N.Content>{text}</N.Content>
      </N.Row2>
    </N.Wrapper>
  );
};

export default CommentNotification;
