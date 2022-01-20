import { dbService, firebaseApp } from 'service/firebase';
import { CommentType } from 'types';
import { changeReplyCommentOrder } from 'utils/comment';

interface ICommentLike {
  post_id: string;
  comment_id: string;
  uid: string;
}

interface ICommentAdd {
  post_id: string;
  uid: string;
  content: string;
  parent_comment_id?: string | null;
  parent_comment_uid?: string | null;
}

export const addComment = async ({
  post_id,
  content,
  uid,
  parent_comment_id = null,
  parent_comment_uid = null,
}: ICommentAdd) => {
  console.log(dbService.doc(`users/${uid}`));

  try {
    const res = await dbService
      .doc(`posts/${post_id}`)
      .collection('comments')
      .add({
        content,
        creator: dbService.doc(`users/${uid}`),
        created_at: new Date().getTime(),
        liker_list: [],
        parent_comment_id,
        parent_comment_uid,
      });
    return res.id;
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (postId: string) => {
  try {
    const res = await dbService
      .doc(`posts/${postId}`)
      .collection('comments')
      .orderBy('created_at', 'asc')
      .get();

    const data: any = await Promise.all(
      res.docs.map(async (doc) => {
        const newItem = doc.data();
        const userData = await newItem.creator.get();
        return { ...newItem, id: doc.id, creator: userData.data() };
      })
    );

    return changeReplyCommentOrder(data);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteComment = async (
  postId: string,
  commentId: string,
  commentList: CommentType[]
) => {
  const targetIndex = commentList.findIndex(({ id }) => id === commentId);
  const isParentComment = !commentList[targetIndex + 1]?.parent_comment_id;

  try {
    // 대댓글 없을때
    if (targetIndex === commentList.length - 1 || isParentComment) {
      await dbService.doc(`posts/${postId}/comments/${commentId}`).delete();
      return;
    }

    // 대댓글 있을때
    await dbService.doc(`posts/${postId}/comments/${commentId}`).update({
      is_deleted: true,
      is_edited: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllComments = async (postId: string) => {
  const ref = dbService.collection(`posts/${postId}/comments`);

  try {
    ref.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        ref
          .doc(doc.id)
          .delete()
          .catch((error) => {
            console.log(error);
          });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReplyComment = async (
  postId: string,
  commentId: string,
  commentList: CommentType[]
) => {
  const targetIndex = commentList.findIndex(({ id }) => id === commentId);
  const parentComment = commentList.filter(
    ({ id }) => id === commentList[targetIndex].parent_comment_id
  )[0];

  try {
    // 부모 댓글 이미 삭제 돼있을 시,
    if (parentComment.is_deleted) {
      await dbService.doc(`posts/${postId}/comments/${parentComment.id}`).delete();
    }

    await dbService.doc(`posts/${postId}/comments/${commentId}`).delete();
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (content: string, postId: string, commentId: string) => {
  try {
    await dbService
      .doc(`posts/${postId}/comments/${commentId}`)
      .update({ content, is_edited: true });
  } catch (error) {
    console.log(error);
  }
};
export const commentLike = async ({ post_id, comment_id, uid }: ICommentLike) => {
  try {
    await dbService.doc(`posts/${post_id}/comments/${comment_id}`).update({
      liker_list: firebaseApp.firestore.FieldValue.arrayUnion(uid),
    });
  } catch (error) {
    console.log(error);
  }
};
export const commentUnlike = async ({ post_id, comment_id, uid }: ICommentLike) => {
  try {
    await dbService.doc(`posts/${post_id}/comments/${comment_id}`).update({
      liker_list: firebaseApp.firestore.FieldValue.arrayRemove(uid),
    });
  } catch (error) {
    console.log(error);
  }
};
