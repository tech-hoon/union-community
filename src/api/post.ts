import { dbService } from 'service/firebase';

interface IgetPostParams {
  lastIndex: number;
  category?: string;
  orderBy: string;
}

interface IaddPostParams {
  postInput: {
    title: string;
    category: string;
    content: string;
  };
  creator: {
    nickname: string;
    uid: string;
    avatarId: number;
  };
}

interface IupdatePostParams {
  postId: string;
  postInput: {
    title: string;
    category: string;
    content: string;
  };
  creator: {
    nickname: string;
    uid: string;
    avatarId: number;
  };
}

export const getAllPosts = async ({ lastIndex, orderBy }: IgetPostParams) => {
  try {
    const res = await dbService.collection('posts').orderBy(orderBy, 'desc').limit(lastIndex).get();

    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getPostsByCategory = async ({ lastIndex, category, orderBy }: IgetPostParams) => {
  try {
    const res = await dbService
      .collection('posts')
      .orderBy(orderBy, 'desc')
      .where('category', '==', category)
      .limit(lastIndex)
      .get();

    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getPostDetail = async (postId: string) => {
  try {
    const res = await dbService.doc(`posts/${postId}`).get();
    return res.data();
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getPostBySearch = async (searchBy: string, value: string) => {
  console.log(value);

  try {
    const res =
      searchBy === 'content'
        ? await dbService.collection(`posts`).where('content', 'in', value).get()
        : await dbService.collection(`posts`).where('creator.nickname', '==', value).get();

    return res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      like_count: 0,
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
      view_count: 0,
      like_count: 0,
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
