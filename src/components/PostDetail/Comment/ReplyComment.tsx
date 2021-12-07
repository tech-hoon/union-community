import S from './Layouts';
import Avatar from 'components/common/Avatar';
import useComment from 'hooks/comment/useComment';
import { CommentType } from 'types';
import { useRef, useState } from 'react';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';
import { toDateStringByFormating } from 'utils/date';

import useModal from 'hooks/common/useModal';
import AlertModalButton from 'components/common/Portal/AlertModalButton';
import PortalContainer from 'components/common/Portal/PortalContainer';

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
  const [deleteId, setDeleteId] = useState<string>('');
  const { modalOpened, onOpenModal, onCloseModal } = useModal();

  const {
    id,
    creator: { uid, nickname, avatar_id },
    content,
    is_edited,
    liker_list,
    created_at,
    is_deleted,
  } = comment;

  const {
    onCancel,
    onDelete,
    onUpdateComment,
    editingComment,
    onEdit,
    onLikeComment,
    onDeleteReplyComment,
  } = useComment(callback);

  return (
    <>
      <S.ReplyWrapper>
        <S.ROW1>
          <S.COL1>
            <S.Avatar avatarId={is_deleted ? -1 : isSecretPost ? -1 : avatar_id} />
          </S.COL1>
          <S.COL2>
            <S.Nickname is_deleted={is_deleted}>
              {is_deleted ? '삭제' : isSecretPost ? '익명' : nickname}
            </S.Nickname>
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
              <S.DelBtn
                onClick={() => {
                  setDeleteId(id);
                  onOpenModal();
                }}
              >
                삭제
              </S.DelBtn>
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

      {modalOpened && (
        <PortalContainer onClose={onCloseModal}>
          <AlertModalButton
            title='대댓글을 삭제하시겠습니까?'
            twoButton={true}
            callback={() => onDeleteReplyComment(postId, deleteId)}
            onCloseModal={onCloseModal}
          />
        </PortalContainer>
      )}
    </>
  );
};

export default ReplyComment;
