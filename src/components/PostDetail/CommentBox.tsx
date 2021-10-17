import styled from 'styled-components';
import { HandThumbsUp, HandThumbsUpFill } from '@styled-icons/bootstrap';
import { CommentType } from 'types';
import Avatar from 'components/common/Avatar';

interface Props {
  commentList: CommentType[];
}

const CommentBox = ({ commentList }: Props) => {
  //TODO: 좋아요 아이콘 처리(liker_list)

  return (
    <List>
      {commentList.map(({ creator: { nickname, avatarId }, content, like_count }, key) => (
        <Comment key={key}>
          <ROW1>
            <COL1>
              <Avatar avatarId={avatarId} />
            </COL1>
            <COL2>
              <Nickname>{nickname}</Nickname>
              <CreatedAt>{new Date().toLocaleDateString()}</CreatedAt>
            </COL2>
            <COL3>
              <Button>
                <LikeButton />
              </Button>
              <LikeCount>{like_count}</LikeCount>
            </COL3>
          </ROW1>
          <ROW2>
            <Content>{content}</Content>
          </ROW2>
        </Comment>
      ))}
    </List>
  );
};

const List = styled.ul``;
const Comment = styled.li`
  margin-bottom: 48px;
`;

const ROW1 = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
`;
const ROW2 = styled.div``;

const COL1 = styled.div``;
const COL2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const COL3 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  gap: 8px;
`;

const CreatedAt = styled.p`
  color: gray;
`;
const Nickname = styled.p`
  font-weight: 700;
  font-size: 20px;
`;
const Content = styled.div`
  font-size: 20px;
  padding: 20px 0 40px;
  border-bottom: solid 2px #e9ecef;
`;
const Button = styled.div`
  width: 20px;
  color: #c62917;
  cursor: pointer;
`;

const LikeButton = styled(HandThumbsUp)``;
const UnlikeButton = styled(HandThumbsUpFill)``;

const LikeCount = styled.div``;

export default CommentBox;
