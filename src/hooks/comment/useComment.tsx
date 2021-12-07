import { useState } from 'react';
import {
  addComment,
  commentLike,
  commentUnlike,
  deleteComment,
  updateComment,
  deleteReplyComment,
} from 'api/comment';
import { likeOrUnlike } from 'utils/likeOrUnlike';

const useComment = (callback: () => void) => {
  const [editingComment, setEditingComment] = useState<string | null>();
  const [replyingComment, setReplyingComment] = useState<string | null>();

  const onCancel = () => setEditingComment(null);
  const onDelete = async (postId: string, commentId: string) => {
    await deleteComment(postId, commentId);
    callback();
  };
  const onUpdateComment = async (postId: string, content: string, commentId: string) => {
    if (content) {
      await updateComment(content, postId, commentId);
      callback();
      setEditingComment(null);
    }
  };

  const onReplyComment = async (postId: string, content: string, uid: string, parentId: string) => {
    if (content) {
      await addComment({
        post_id: postId,
        uid: uid,
        content: content,
        parent_comment_id: parentId,
      });
      callback();
      setReplyingComment(null);
    }
  };

  const onDeleteReplyComment = async (postId: string, commentId: string) => {
    await deleteReplyComment(postId, commentId);
    callback();
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

  const onLikeComment = async (
    like_list: string[],
    loginUserUid: string,
    comment_id: string,
    postId: string
  ) => {
    likeOrUnlike(like_list, loginUserUid) === 'unlike'
      ? await commentUnlike({ post_id: postId, comment_id, uid: loginUserUid })
      : await commentLike({ post_id: postId, comment_id, uid: loginUserUid });
    callback();
  };

  return {
    onCancel,
    onDelete,
    onUpdateComment,
    onReplyComment,
    editingComment,
    replyingComment,
    onEdit,
    onReplyOpen,
    onReplyCancle,
    onDeleteReplyComment,
    onLikeComment,
  };
};

export default useComment;
