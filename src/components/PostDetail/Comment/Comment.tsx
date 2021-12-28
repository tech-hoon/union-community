import S from './Layouts';
import { CommentType, UserType } from 'types';
import { useRef, useState, memo } from 'react';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';
import { toDateStringByFormating } from 'utils/date';
import useComment from 'hooks/comment/useComment';
import useModal from 'hooks/common/useModal';
import AlertModal from 'components/common/Portal/AlertModal';
import PortalContainer from 'components/common/Portal/PortalContainer';
import { urlParsingRegex } from 'utils/regex';

import { commentState } from 'store/comment';

import UserMenuModal from 'components/common/Portal/UserMenuModal';
import { useRecoilValue } from 'recoil';

interface Props {
  comment: CommentType;
  postId: string;
  loginUserId: string;
  category: string;
  callback: () => void;
}

const Comment = ({ comment, postId, loginUserId, category, callback }: Props) => {
  const inputRef = useRef<any>(null);
  const replyInputRef = useRef<any>(null);
  const isSecret = category === '비밀';
  const [deleteId, setDeleteId] = useState<string>('');
  const { modalOpened, onOpenModal, onCloseModal } = useModal();

  const commentList = useRecoilValue(commentState);

  const {
    id,
    creator: { uid, nickname, avatar_id },
    creator,
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
    onReplyComment,
    editingComment,
    replyingComment,
    onEdit,
    onReplyOpen,
    onReplyCancle,
    onLikeComment,
  } = useComment(callback);

  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  return (
    <>
      <S.CommentWrapper>
        <S.ROW1>
          <S.CreatorWrapper onClick={onOpenUserMenu}>
            <S.COL1>
              <S.Avatar avatarId={is_deleted ? -1 : isSecret ? -1 : avatar_id} />
            </S.COL1>
            <S.COL2>
              <S.Nickname is_deleted={is_deleted}>
                {is_deleted ? '삭제' : isSecret ? '익명' : nickname}
              </S.Nickname>
              <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
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
          <S.COL5>
            {!is_deleted && <S.ReplyBtn onClick={() => onReplyOpen(id)}>답글</S.ReplyBtn>}
            {uid === loginUserId && !is_deleted && (
              <>
                <S.EditBtn onClick={() => onEdit(id)}>수정</S.EditBtn>
                <S.DelBtn
                  onClick={() => {
                    setDeleteId(id);
                    onOpenModal();
                  }}
                >
                  삭제
                </S.DelBtn>
              </>
            )}
          </S.COL5>
        </S.ROW1>
        <S.ROW2>
          {uid === loginUserId && editingComment === id ? (
            <S.EditContent>
              <S.EditInput autoFocus defaultValue={content} ref={inputRef} />
              <S.EditCancelBtn onClick={onCancel}>취소하기</S.EditCancelBtn>
              <S.EditSubmitBtn onClick={() => onUpdateComment(postId, inputRef.current.value, id)}>
                등록하기
              </S.EditSubmitBtn>
            </S.EditContent>
          ) : (
            <S.Content
              is_deleted={is_deleted}
              dangerouslySetInnerHTML={{
                __html: is_deleted ? '삭제된 댓글입니다.' : urlParsingRegex(content),
              }}
            ></S.Content>
          )}
        </S.ROW2>
        {replyingComment === id && (
          <S.ROW3>
            <S.ReplyInput
              autoFocus
              ref={replyInputRef}
              placeholder={`${isSecret ? '익명' : nickname}에게 답글 달기`}
            />
            <S.ReplyCancleBtn onClick={onReplyCancle}>취소하기</S.ReplyCancleBtn>
            <S.ReplySubmitBtn
              onClick={() =>
                onReplyComment(postId, replyInputRef.current.value, loginUserId, id, uid)
              }
            >
              등록하기
            </S.ReplySubmitBtn>
          </S.ROW3>
        )}
      </S.CommentWrapper>

      {modalOpened && (
        <PortalContainer onClose={onCloseModal}>
          <AlertModal
            title='댓글을 삭제하시겠습니까?'
            twoButton={true}
            callback={() => {
              onDelete(postId, deleteId, commentList);
            }}
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

export default memo(Comment);
