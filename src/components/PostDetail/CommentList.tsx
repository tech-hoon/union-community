import styled from 'styled-components';
import { Like } from '@styled-icons/boxicons-regular';

import { MOCK_COMMENT_LIST } from 'assets/mockData';
import { CommentType } from 'types';

interface Props {
  commentList: CommentType[];
}

const CommentList = ({ commentList }: Props) => {
  return (
    <List>
      {MOCK_COMMENT_LIST.map(({ user_id, avatar_img, content, like_count }, key) => (
        <Comment key={key}>
          <ROW1>
            <COL1>
              <Avatar src={avatar_img} />
            </COL1>
            <COL2>
              <Nickname>{user_id}</Nickname>
              <CreatedAt>{new Date().toLocaleDateString()}</CreatedAt>
            </COL2>
            <COL3>
              <LikeButton />
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
const Avatar = styled.img`
  width: 32px;
`;
const CreatedAt = styled.p`
  color: gray;
`;
const Nickname = styled.p`
  font-family: 'Spoqa Bold';
  font-size: 20px;
`;
const Content = styled.div`
  font-size: 20px;
  padding: 20px 0 40px;
  border-bottom: solid 2px #e9ecef;
`;
const LikeButton = styled(Like)`
  width: 24px;
  color: red;
  cursor: pointer;
`;
const LikeCount = styled.div``;

export default CommentList;
