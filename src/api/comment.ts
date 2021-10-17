import { dbService } from 'service/firebase';
import { loginUserType, CreatorType, CommentType } from 'types';

interface IaddComment {
  post_id: string;
  creator: CreatorType;
  content: string;
}

export const addComment = async ({ post_id, content, creator }: IaddComment) => {
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

export const deleteComment = async () => {};
export const updateComment = async () => {};
export const commentLike = async () => {};
export const commentLikeCancle = async () => {};
