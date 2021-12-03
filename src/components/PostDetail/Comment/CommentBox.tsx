import styled from 'styled-components';
import { CommentType, loginUserType } from 'types';
import Avatar from 'components/common/Avatar';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { addComment, commentLike, commentUnlike, deleteComment, updateComment } from 'api/comment';
import { useRef, useState } from 'react';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';
import LikeCount from 'components/common/Count/LikeCount';
import { toDateStringByFormating } from 'utils/date';

interface Props {
  postId: string;
  commentList: CommentType[];
  fetchComments: () => void;
  category: string;
}

const CommentBox = ({ postId, commentList, fetchComments, category }: Props) => {
  const [editingComment, setEditingComment] = useState<string | null>();
  const [replyingComment, setReplyingComment] = useState<string | null>();
  const loginUser = useRecoilValue(loginUserState) as loginUserType;
  const inputRef = useRef<any>(null);
  const replyInputRef = useRef<any>(null);
  const isSecretPost = category === '비밀';

  const onCancel = () => setEditingComment(null);
  const onDelete = async (commentId: string) => {
    //TODO: 모달창
    //TODO: 대댓글도 같이 지우기
    await deleteComment(postId, commentId);
    fetchComments();
    setEditingComment(null);
  };
  const onUpdateComment = async (commentId: string) => {
    if (inputRef.current.value) {
      await updateComment(inputRef.current.value, postId, commentId);
      fetchComments();
      setEditingComment(null);
    }
  };

  const onReplyComment = async (parentId: string) => {
    if (replyInputRef.current.value) {
      await addComment({
        post_id: postId,
        uid: loginUser.uid,
        content: replyInputRef.current.value,
        parent_comment_id: parentId,
      });
      fetchComments();
      setReplyingComment(null);
    }
  };

  const onEdit = (targetId: string) => {
    setReplyingComment(null);
    setEditingComment(targetId);
  };

  const onReplyOpen = (targetId: string) => {
    setEditingComment(null);
    setReplyingComment(targetId);
  };

  const onReplyCancle = () => setReplyingComment(null);

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
          {
            id,
            creator: { uid, nickname, avatar_id },
            content,
            is_edited,
            liker_list,
            created_at,
            parent_comment_id,
            is_deleted,
          },
          key
        ) =>
          parent_comment_id === null ? (
            <Comment key={key}>
              <ROW1>
                <COL1>
                  <Avatar avatarId={isSecretPost ? -1 : avatar_id} />
                </COL1>
                <COL2>
                  <Nickname>{isSecretPost ? '익명' : nickname}</Nickname>
                  <CreatedAt>{toDateStringByFormating(created_at, true)}</CreatedAt>
                </COL2>
                {!is_deleted && (
                  <COL3>
                    <LikeCount
                      size='16px'
                      count={liker_list.length || 0}
                      flag={likeOrUnlike(liker_list, loginUser?.uid)}
                      onClick={debounce(() => onLikeComment(liker_list, loginUser?.uid, id), 500)}
                    />
                    <IsEdited>{is_edited ? '수정됨' : ''}</IsEdited>
                  </COL3>
                )}
                <COL5>
                  {uid === loginUser.uid && !is_deleted && (
                    <>
                      <ReplyBtn onClick={() => onReplyOpen(id)}>답글</ReplyBtn>
                      <EditBtn onClick={() => onEdit(id)}>수정</EditBtn>
                      <DelBtn onClick={() => onDelete(id)}>삭제</DelBtn>
                    </>
                  )}
                </COL5>
              </ROW1>
              <ROW2>
                {uid === loginUser.uid && editingComment === id ? (
                  <EditContent>
                    <EditInput autoFocus defaultValue={content} ref={inputRef} />
                    <EditCancelBtn onClick={onCancel}>취소하기</EditCancelBtn>
                    <EditSubmitBtn onClick={() => onUpdateComment(id)}>등록하기</EditSubmitBtn>
                  </EditContent>
                ) : (
                  <Content is_deleted={is_deleted}>
                    {is_deleted ? '삭제된 댓글입니다' : content}
                  </Content>
                )}
              </ROW2>
              {replyingComment === id && !is_deleted ? (
                <ROW3>
                  <ReplyInput
                    autoFocus
                    ref={replyInputRef}
                    placeholder={`${isSecretPost ? '익명' : nickname}에게 답글 달기`}
                  />
                  <ReplyCancleBtn onClick={onReplyCancle}>취소하기</ReplyCancleBtn>
                  <ReplySubmitBtn onClick={() => onReplyComment(id)}>등록하기</ReplySubmitBtn>
                </ROW3>
              ) : (
                <></>
              )}
            </Comment>
          ) : (
            <ReplyComment key={key}>
              <ROW1>
                <COL1>
                  <Avatar avatarId={isSecretPost ? -1 : avatar_id} />
                </COL1>
                <COL2>
                  <Nickname>{isSecretPost ? '익명' : nickname}</Nickname>
                  <CreatedAt>{toDateStringByFormating(created_at, true)}</CreatedAt>
                </COL2>
                {!is_deleted && (
                  <COL3>
                    <LikeCount
                      size='16px'
                      count={liker_list.length || 0}
                      flag={likeOrUnlike(liker_list, loginUser?.uid)}
                      onClick={debounce(() => onLikeComment(liker_list, loginUser?.uid, id), 500)}
                    />
                    <IsEdited>{is_edited ? '수정됨' : ''}</IsEdited>
                  </COL3>
                )}
                {uid === loginUser.uid && !is_deleted && (
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
                    <EditSubmitBtn onClick={() => onUpdateComment(id)}>등록하기</EditSubmitBtn>
                  </EditContent>
                ) : (
                  <Content is_deleted={is_deleted}>
                    {is_deleted ? '삭제된 댓글입니다' : content}
                  </Content>
                )}
              </ROW2>
            </ReplyComment>
          )
      )}
    </List>
  );
};

const List = styled.ul``;
const Comment = styled.li`
  margin-bottom: 24px;
`;

const ReplyComment = styled.li`
  margin-bottom: 48px;
  margin-left: 40px;
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
  gap: 4px;
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
  gap: 4px;
`;

const CommentButton = styled.button`
  color: gray;
  padding: 4px 4px;
  font-size: 0.7rem;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.5rem;
  }
`;

const ReplyBtn = styled(CommentButton)``;
const EditBtn = styled(CommentButton)``;
const DelBtn = styled(CommentButton)``;

const CreatedAt = styled.p`
  font-size: 0.8rem;
  color: gray;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.5rem;
  }
`;
const Nickname = styled.p`
  font-weight: 700;
  font-size: 1rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
  margin: 10px 0;
  width: 100%;

  &::placeholder {
    color: gray;
  }
`;

const EditContent = styled.div``;

const EditInput = styled(Input)``;

const Button = styled.button`
  font-size: 0.8rem;
  padding: 6px 10px;
  border-radius: 4px;
  color: white;
`;

const EditCancelBtn = styled(Button)`
  background-color: #888;
  margin-right: 8px;
`;
const EditSubmitBtn = styled(Button)`
  background-color: black;
`;

interface IContent {
  is_deleted: boolean;
}

const Content = styled.p<IContent>`
  font-size: 1rem;
  padding: 12px 0;
  border-bottom: solid 1.4px #e9ecef;
  word-break: break-all;

  font-style: ${({ is_deleted }) => is_deleted && 'italic'};
  color: ${({ is_deleted }) => is_deleted && `#666`};
`;

const ROW3 = styled.div``;

const ReplyInput = styled(Input)``;
const ReplySubmitBtn = styled(EditSubmitBtn)``;
const ReplyCancleBtn = styled(EditCancelBtn)``;

export default CommentBox;
