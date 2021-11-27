import { dbService, firebaseApp } from 'service/firebase';
import { UserType } from 'types';
import { CARD_LIMIT } from 'utils/config';

interface IgetPostParams {
  lastVisiblePost?: string;
  category?: string;
  orderBy: string;
}

interface IaddPostParams {
  postInput: {
    title: string;
    category: string;
    content: string;
    attachmentUrl?: string;
  };
  creator: UserType;
}

interface IupdatePostParams {
  postId: string;
  postInput: {
    title: string;
    category: string;
    content: string;
  };
  creator: UserType;
}

export const getInitialPosts = async ({ orderBy, category }: IgetPostParams) => {
  try {
    const res = category
      ? await dbService
          .collection('posts')
          .orderBy(orderBy, 'desc')
          .where('category', '==', category)
          .limit(CARD_LIMIT)
          .get()
      : await dbService.collection('posts').orderBy(orderBy, 'desc').limit(CARD_LIMIT).get();

    const data = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisiblePost = res.docs[res.docs.length - 1];

    return { data, lastVisiblePost };
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getMorePosts = async ({ lastVisiblePost, category, orderBy }: IgetPostParams) => {
  try {
    const res = category
      ? await dbService
          .collection('posts')
          .where('category', '==', category)
          .orderBy(orderBy, 'desc')
          .startAfter(lastVisiblePost)
          .limit(CARD_LIMIT)
          .get()
      : await dbService
          .collection('posts')
          .orderBy(orderBy, 'desc')
          .startAfter(lastVisiblePost)
          .limit(CARD_LIMIT)
          .get();

    const data = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const __lastVisiblePost = res.docs[res.docs.length - 1];

    return { data, lastVisiblePost: __lastVisiblePost };
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getPostDetail = async (postId: string) => {
  try {
    const res = await dbService.doc(`posts/${postId}`).get();

    return { ...res.data(), id: res.id };
  } catch (error) {
    console.log(error);
    return;
  }
};

//TODO
//카테고리
//내용
export const getPostBySearch = async (searchBy: string, value: string) => {
  try {
    if (value) {
      const res =
        searchBy === 'content'
          ? await dbService.collection(`posts`).where('content', 'in', value).get()
          : await dbService.collection(`posts`).where('creator.nickname', '==', value).get();

      return res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const addPost = async ({ postInput, creator }: IaddPostParams) => {
  try {
    const res = await dbService.collection('posts').add({
      ...postInput,
      creator,
      view_count: 0,
      liker_list: [],
      created_at: new Date().getTime(),
    });
    return res.id;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async ({ postId, postInput, creator }: IupdatePostParams) => {
  try {
    await dbService.doc(`posts/${postId}`).update({
      ...postInput,
      creator,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await dbService.doc(`posts/${postId}`).delete();
  } catch (error) {
    console.log(error);
  }
};

export const viewCountUp = async (postId: string) => {
  try {
    await dbService.doc(`posts/${postId}`).update({
      view_count: firebaseApp.firestore.FieldValue.increment(1),
    });
  } catch (error) {
    console.log(error);
  }
};

export const postLike = async (post_id: string, uid: string) => {
  try {
    await dbService.doc(`posts/${post_id}`).update({
      liker_list: firebaseApp.firestore.FieldValue.arrayUnion(uid),
    });
  } catch (error) {
    console.log(error);
  }
};
export const postUnlike = async (post_id: string, uid: string) => {
  try {
    await dbService.doc(`posts/${post_id}`).update({
      liker_list: firebaseApp.firestore.FieldValue.arrayRemove(uid),
    });
  } catch (error) {
    console.log(error);
  }
};
