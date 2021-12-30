import S from './Layouts';
import Avatar from 'components/common/Avatar';
import useComment from 'hooks/comment/useComment';
import { CommentType } from 'types';
import { useRef, useState, memo } from 'react';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';
import { toDateStringByFormating } from 'utils/date';

import useModal from 'hooks/common/useModal';
import AlertModal from 'components/common/Portal/AlertModal';
import UserMenuModal from 'components/common/Portal/UserMenuModal';
import PortalContainer from 'components/common/Portal/PortalContainer';

import { useRecoilValue } from 'recoil';
import { commentState } from 'store/comment';
import { convertNickname } from 'utils/comment';

interface Props {
  comment: CommentType;
  postId: string;
  loginUserId: string;
  category: string;
  callback: () => void;
}

const ReplyComment = ({ comment, postId, loginUserId, category, callback }: Props) => {
  const replyInputRef = useRef<any>(null);
  const isSecret = category === '비밀';
  const [deleteId, setDeleteId] = useState<string>('');
  const { modalOpened, onOpenModal, onCloseModal } = useModal();
  const commentList = useRecoilValue(commentState);

  const {
    id,
    creator,
    creator: { uid, nickname, avatar_id },
    content,
    is_edited,
    liker_list,
    created_at,
    is_deleted,
    is_post_creator,
  } = comment;

  const convertedNickname = convertNickname(is_deleted, isSecret, is_post_creator, nickname);

  const {
    onCancel,
    onDelete,
    onUpdateComment,
    editingComment,
    onEdit,
    onLikeComment,
    onDeleteReplyComment,
  } = useComment(callback);

  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  return (
    <>
      <S.ReplyWrapper>
        <S.ROW1>
          <S.CreatorWrapper onClick={onOpenUserMenu}>
            <S.COL1>
              <S.Avatar avatarId={is_deleted ? -1 : isSecret ? -1 : avatar_id} />
            </S.COL1>
            <S.COL2>
              <S.Nickname is_deleted={is_deleted}>{convertedNickname}</S.Nickname>
              <S.CreatedAt>{toDateStringByFormating(created_at, true)}</S.CreatedAt>
            </S.COL2>
          </S.CreatorWrapper>
          {!is_deleted && (
            <S.COL3>
              <S.LikeCount
                size='12px'
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
          <AlertModal
            title='대댓글을 삭제하시겠습니까?'
            twoButton={true}
            callback={() => onDeleteReplyComment(postId, deleteId, commentList)}
            onCloseModal={onCloseModal}
          />
        </PortalContainer>
      )}

      {userMenuOpened && creator.uid !== loginUserId && (
        <PortalContainer onClose={onCloseUserMenu}>
          <UserMenuModal reciever={creator} onCloseModal={onCloseUserMenu} isSecret={isSecret} />
        </PortalContainer>
      )}
    </>
  );
};

export default memo(ReplyComment);
