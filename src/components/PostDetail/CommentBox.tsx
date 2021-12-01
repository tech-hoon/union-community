import styled from 'styled-components';
import { Heart, HeartOutlined } from '@styled-icons/entypo';
import { CommentType, loginUserType } from 'types';
import Avatar from 'components/common/Avatar';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { commentLike, commentUnlike, deleteComment, updateComment } from 'api/comment';
import { useRef, useState } from 'react';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';
import LikeCount from 'components/common/Count/LikeCount';
import { toDateStringByFormating } from 'utils/date';

interface Props {
  postId: string;
  commentList: CommentType[];
  fetchComments: () => void;
}

const CommentBox = ({ postId, commentList, fetchComments }: Props) => {
  const [editingComment, setEditingComment] = useState<string | null>();
  const loginUser = useRecoilValue(loginUserState) as loginUserType;
  const inputRef = useRef<any>(null);

  const onEdit = (targetId: string) => setEditingComment(targetId);
  const onCancel = () => setEditingComment(null);
  const onDelete = async (commentId: string) => {
    //TODO: 모달창
    await deleteComment(postId, commentId);
    fetchComments();
    setEditingComment(null);
  };
  const onSubmit = async (commentId: string) => {
    if (inputRef.current.value) {
      await updateComment(inputRef.current.value, postId, commentId);
      fetchComments();
      setEditingComment(null);
    }
  };

  const onLikeComment = async (like_list: string[], loginUserUid: string, comment_id: string) => {
    likeOrUnlike(like_list, loginUserUid) === 'unlike'
      ? await commentUnlike({ post_id: postId, comment_id, uid: loginUserUid })
      : await commentLike({ post_id: postId, comment_id, uid: loginUserUid });
    fetchComments();
  };

  return (
    <List>
      {commentList.map(
        (
          { id, creator: { uid, nickname, avatar_id }, content, is_edited, liker_list, created_at },
          key
        ) => {
          return (
            <Comment key={key}>
              <ROW1>
                <COL1>
                  <Avatar avatarId={avatar_id} />
                </COL1>
                <COL2>
                  <Nickname>{nickname}</Nickname>
                  <CreatedAt>{toDateStringByFormating(created_at, true)}</CreatedAt>
                </COL2>
                <COL3>
                  <LikeCount
                    size='16px'
                    count={liker_list.length || 0}
                    flag={likeOrUnlike(liker_list, loginUser?.uid)}
                    onClick={debounce(() => onLikeComment(liker_list, loginUser?.uid, id), 800)}
                  />
                  <IsEdited>{is_edited ? '수정됨' : ''}</IsEdited>
                </COL3>
                {uid === loginUser.uid && (
                  <COL5>
                    <EditBtn onClick={() => onEdit(id)}>수정</EditBtn>
                    <DelBtn onClick={() => onDelete(id)}>삭제</DelBtn>
                  </COL5>
                )}
              </ROW1>
              <ROW2>
                {uid === loginUser.uid && editingComment === id ? (
                  <EditContent>
                    <EditInput autoFocus defaultValue={content} ref={inputRef} />
                    <EditCancelBtn onClick={onCancel}>취소하기</EditCancelBtn>
                    <EditSubmitBtn onClick={() => onSubmit(id)}>등록하기</EditSubmitBtn>
                  </EditContent>
                ) : (
                  <Content>{content}</Content>
                )}
              </ROW2>
            </Comment>
          );
        }
      )}
    </List>
  );
};

const List = styled.ul``;
const Comment = styled.li`
  margin-bottom: 48px;
`;

const ROW1 = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
`;
const ROW2 = styled.div`
  margin: 0 4px;
`;

const COL1 = styled.div`
  margin-right: 2px;
`;
const COL2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const COL3 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  gap: 4px;
`;

const IsEdited = styled.p`
  font-size: 0.8rem;
`;

const COL5 = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 8px;

  @media ${({ theme }) => theme.size.mobile} {
    flex-direction: column;
  }
`;

const CommentButton = styled.button`
  border: 0.5px solid #eee;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.7rem;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.5rem;
  }
`;

const EditBtn = styled(CommentButton)``;
const DelBtn = styled(CommentButton)``;

const CreatedAt = styled.p`
  color: gray;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.7rem;
  }
`;
const Nickname = styled.p`
  font-weight: 700;
  font-size: 1rem;
`;

const EditContent = styled.div``;

const EditInput = styled.input`
  font-size: 20px;
  padding: 12px 4px;
  border: 1px solid gray;
  border-radius: 2px;
  margin: 10px 0;
  width: 100%;
`;

const EditCancelBtn = styled(CommentButton)`
  margin-right: 8px;
`;
const EditSubmitBtn = styled(CommentButton)``;

const Content = styled.p`
  font-size: 1rem;
  padding: 20px 0;
  border-bottom: solid 2px #e9ecef;
  word-break: break-all;
`;

export default CommentBox;
