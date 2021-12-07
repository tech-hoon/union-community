import S from './Layouts';
import Avatar from 'components/common/Avatar';
import useComment from 'hooks/comment/useComment';
import { CommentType } from 'types';
import { useRef } from 'react';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';
import { toDateStringByFormating } from 'utils/date';

interface Props {
  comment: CommentType;
  postId: string;
  loginUserId: string;
  category: string;
  callback: () => void;
}

const ReplyComment = ({ comment, postId, loginUserId, category, callback }: Props) => {
  const replyInputRef = useRef<any>(null);
  const isSecretPost = category === '비밀';

  const {
    id,
    creator: { uid, nickname, avatar_id },
    content,
    is_edited,
    liker_list,
    created_at,
    is_deleted,
  } = comment;

  const { onCancel, onDelete, onUpdateComment, editingComment, onEdit, onLikeComment } =
    useComment(callback);

  return (
    <S.ReplyWrapper>
      <S.ROW1>
        <S.COL1>
          <Avatar avatarId={isSecretPost ? -1 : avatar_id} />
        </S.COL1>
        <S.COL2>
          <S.Nickname>{isSecretPost ? '익명' : nickname}</S.Nickname>
          <S.CreatedAt>{toDateStringByFormating(created_at, true)}</S.CreatedAt>
        </S.COL2>
        {!is_deleted && (
          <S.COL3>
            <S.LikeCount
              size='16px'
              count={liker_list.length || 0}
              flag={likeOrUnlike(liker_list, loginUserId)}
              onClick={debounce(() => onLikeComment(liker_list, loginUserId, id, postId), 500)}
            />
            <S.IsEdited>{is_edited ? '수정됨' : ''}</S.IsEdited>
          </S.COL3>
        )}
        {uid === loginUserId && !is_deleted && (
          <S.COL5>
            <S.EditBtn onClick={() => onEdit(id)}>수정</S.EditBtn>
            <S.DelBtn onClick={() => onDelete(postId, id)}>삭제</S.DelBtn>
          </S.COL5>
        )}
      </S.ROW1>
      <S.ROW2>
        {uid === loginUserId && editingComment === id ? (
          <S.EditContent>
            <S.EditInput autoFocus defaultValue={content} ref={replyInputRef} />
            <S.EditCancelBtn onClick={onCancel}>취소하기</S.EditCancelBtn>
            <S.EditSubmitBtn
              onClick={() => onUpdateComment(postId, replyInputRef.current.value, id)}
            >
              등록하기
            </S.EditSubmitBtn>
          </S.EditContent>
        ) : (
          <S.Content is_deleted={is_deleted}>
            {is_deleted ? '삭제된 댓글입니다' : content}
          </S.Content>
        )}
      </S.ROW2>
    </S.ReplyWrapper>
  );
};

export default ReplyComment;
