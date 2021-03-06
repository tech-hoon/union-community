import { dbService, firebaseApp } from 'service/firebase';
import { CARD_LIMIT } from 'utils/config';
import { deleteAllComments } from './comment';
import { PRODUCT_STATUS, PRODUCT_TYPE } from 'utils/config';

interface IgetPostParams {
  lastVisiblePost?: string;
  category?: string;
  orderBy: string;
}

type PostInput = {
  title: string;
  category: string;
  content: string;
  attachment_url: string[];
};

type ProductInput = {
  title: string;
  category: string;
  content: string;
  status: string;
  type: string;
  price: string;
  attachment_url: string[];
};

interface IaddPostParams {
  postInput: PostInput | ProductInput;
  uid: string;
}

interface IupdatePostParams extends IaddPostParams {
  postId: string;
}

export const getInitialPosts = async ({ orderBy, category }: IgetPostParams) => {
  try {
    const res =
      category !== '전체'
        ? await dbService
            .collection('posts')
            .orderBy(orderBy, 'desc')
            .where('category', '==', category)
            .limit(CARD_LIMIT)
            .get()
        : await dbService.collection('posts').orderBy(orderBy, 'desc').limit(CARD_LIMIT).get();

    const data = await Promise.all(
      res.docs.map(async (doc) => {
        const newItem = doc.data();
        const userData = await newItem.creator.get();
        const commentCount = (await dbService.collection(`posts/${doc.id}/comments`).get()).size;

        return { ...newItem, id: doc.id, creator: userData.data(), comment_count: commentCount };
      })
    );

    const lastVisiblePost = res.docs[res.docs.length - 1];

    return { data, lastVisiblePost };
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getMorePosts = async ({ lastVisiblePost, category, orderBy }: IgetPostParams) => {
  try {
    const res =
      category !== '전체'
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

    const data = await Promise.all(
      res.docs.map(async (doc) => {
        const newItem = doc.data();
        const userData = await newItem.creator.get();
        const commentCount = (await dbService.collection(`posts/${doc.id}/comments`).get()).size;

        return { ...newItem, id: doc.id, creator: userData.data(), comment_count: commentCount };
      })
    );

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

    const postData: any = res.data();
    const userData = await postData.creator.get();

    const data = {
      ...postData,
      id: res.id,
      creator: userData.data(),
    };

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

//TODO
//카테고리
//내용
export const getPostBySearch = async (
  category: string,
  orderBy: string,
  searchBy: string,
  value: string
) => {
  try {
    if (value) {
      if (searchBy === 'content') {
        const res = await dbService.collection(`posts`).where('content', 'in', value).get();
        const posts = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('검색된 포스트', posts);
        return posts;
      }

      const res = await dbService.collection(`posts`).where('creator.nickname', '==', value).get();
      const posts = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('검색된 포스트', posts);
      return posts;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const addPost = async ({ postInput, uid }: IaddPostParams) => {
  try {
    const res = await dbService.collection('posts').add({
      ...postInput,
      creator: dbService.doc(`users/${uid}`),
      view_count: 0,
      like_count: 0,
      liker_list: [],
      visitor_list: [],
      created_at: new Date().getTime(),
      is_edited: false,
    });
    return res.id;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async ({ postId, postInput, uid }: IupdatePostParams) => {
  try {
    await dbService.doc(`posts/${postId}`).update({
      ...postInput,
      creator: dbService.doc(`users/${uid}`),
      is_edited: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await dbService.doc(`posts/${postId}`).delete();
    deleteAllComments(postId);
  } catch (error) {
    console.log(error);
  }
};

export const viewCountUp = async (postId: string, uid: string) => {
  try {
    await dbService.doc(`posts/${postId}`).update({
      visitor_list: firebaseApp.firestore.FieldValue.arrayUnion(uid),
    });
  } catch (error) {
    console.log(error);
  }
};

export const postLike = async (postId: string, uid: string) => {
  try {
    await dbService.doc(`posts/${postId}`).update({
      liker_list: firebaseApp.firestore.FieldValue.arrayUnion(uid),
      like_count: firebaseApp.firestore.FieldValue.increment(1),
    });

    await dbService.doc(`users/${uid}`).update({
      like_list: firebaseApp.firestore.FieldValue.arrayUnion(postId),
    });
  } catch (error) {
    console.log(error);
  }
};
export const postUnlike = async (postId: string, uid: string) => {
  try {
    await dbService.doc(`posts/${postId}`).update({
      liker_list: firebaseApp.firestore.FieldValue.arrayRemove(uid),
      like_count: firebaseApp.firestore.FieldValue.increment(-1),
    });

    await dbService.doc(`users/${uid}`).update({
      like_list: firebaseApp.firestore.FieldValue.arrayRemove(postId),
    });
  } catch (error) {
    console.log(error);
  }
};
