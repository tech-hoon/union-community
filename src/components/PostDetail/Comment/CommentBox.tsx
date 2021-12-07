import styled from 'styled-components';
import { CommentType, LoginUserType } from 'types';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import ReplyComment from './ReplyComment';
import Comment from './Comment';

interface Props {
  postId: string;
  commentList: CommentType[];
  fetchComments: () => void;
  category: string;
}

const CommentBox = ({ postId, commentList, fetchComments, category }: Props) => {
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  return (
    <List>
      {commentList.map((comment: CommentType, key) =>
        comment.parent_comment_id === null ? (
          <Comment
            comment={comment}
            postId={postId}
            category={category}
            loginUserId={loginUser.uid}
            callback={fetchComments}
            key={key}
          />
        ) : (
          <ReplyComment
            comment={comment}
            postId={postId}
            category={category}
            loginUserId={loginUser.uid}
            callback={fetchComments}
            key={key}
          />
        )
      )}
    </List>
  );
};

const List = styled.ul``;

export default CommentBox;
