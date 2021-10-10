import { dbService } from 'service/firebase';

interface IgetPostParams {
  lastIndex: number;
  category?: string;
}

interface IaddPostParams {
  postInput: {
    title: string;
    category: string;
    content: string;
  };
  creator: {
    displayName: string;
    uid: string;
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
    displayName: string;
    uid: string;
  };
}

export const getAllPosts = async ({ lastIndex }: IgetPostParams) => {
  try {
    const res = await dbService
      .collection('posts')
      .orderBy('created_at', 'desc')
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

export const getPostsByCategory = async ({ lastIndex, category }: IgetPostParams) => {
  try {
    const res = await dbService
      .collection('posts')
      .orderBy('created_at', 'desc')
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

export const getPostDetail = async (id: string) => {
  try {
    const res = await dbService.collection('posts').get();
    return res.docs.filter((doc) => doc.id === id)[0].data();
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
      comment_list: [],
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
      created_at: new Date().getTime(),
      comment_list: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id: string) => {
  try {
    const res = await dbService.collection('posts').doc();
  } catch (error) {}
};
