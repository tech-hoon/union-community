import styled from 'styled-components';
import { Heart, HeartOutlined } from '@styled-icons/entypo';
import { CommentType } from 'types';
import Avatar from 'components/common/Avatar';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { commentLike, commentUnlike, deleteComment, updateComment } from 'api/comment';
import { useRef, useState } from 'react';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';

interface Props {
  postId: string;
  commentList: CommentType[];
  fetchComments: () => void;
}

const CommentBox = ({ postId, commentList, fetchComments }: Props) => {
  //TODO: 좋아요 아이콘 처리(liker_list)
  const [editingComment, setEditingComment] = useState<string | null>();
  const loginUser = useRecoilValue(loginUserState);
  const inputRef = useRef<any>(null);

  const onEdit = (targetId: string) => setEditingComment(targetId);
  const onDelete = async (commentId: string) => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      await deleteComment(postId, commentId);
      fetchComments();
      setEditingComment(null);
    }
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
        ({ id, creator: { uid, nickname, avatarId }, content, is_edited, liker_list }, key) => {
          return (
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
                  <Button
                    onClick={debounce(() => onLikeComment(liker_list, loginUser.uid, id), 400)}
                  >
                    {likeOrUnlike(liker_list, loginUser.uid) === 'unlike' ? (
                      <UnlikeButton />
                    ) : (
                      <LikeButton />
                    )}
                  </Button>
                  <LikeCount>{liker_list.length}</LikeCount>
                </COL3>
                <COL4>{is_edited && '수정됨'}</COL4>
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
                    <EditCancleBtn onClick={() => onEdit(id)}>취소하기</EditCancleBtn>
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
  gap: 4px;
`;

const COL4 = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-left: 8px;
`;

const COL5 = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 8px;
`;

const EditBtn = styled.button``;
const DelBtn = styled.button``;

const CreatedAt = styled.p`
  color: gray;
`;
const Nickname = styled.p`
  font-weight: 700;
  font-size: 20px;
`;

const EditContent = styled.div``;

const EditInput = styled.input`
  font-size: 20px;
  padding: 20px 0 40px;
  width: 100%;
`;

const EditCancleBtn = styled.button``;
const EditSubmitBtn = styled.button``;

const Content = styled.p`
  font-size: 20px;
  padding: 20px 0 40px;
  border-bottom: solid 2px #e9ecef;
`;
const Button = styled.div`
  width: 20px;
  color: #ed384f;
  cursor: pointer;
`;

const LikeButton = styled(HeartOutlined)``;
const UnlikeButton = styled(Heart)``;

const LikeCount = styled.div`
  font-size: 1rem;
`;

export default CommentBox;
