import { dbService, firebaseApp } from 'service/firebase';
import { loginUserType, CreatorType, CommentType } from 'types';

interface ICommentAdd {
  post_id: string;
  creator: CreatorType;
  content: string;
}

interface ICommentLike {
  post_id: string;
  comment_id: string;
  uid: string;
}

export const addComment = async ({ post_id, content, creator }: ICommentAdd) => {
  try {
    const res = await dbService.doc(`posts/${post_id}`).collection('comments').add({
      content,
      creator,
      created_at: new Date().getTime(),
      like_count: 0,
      liker_list: [],
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
      .orderBy('created_at', 'desc')
      .get();
    return res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteComment = async (postId: string, commentId: string) => {
  try {
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
