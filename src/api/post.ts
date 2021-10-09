import { dbService } from 'service/firebase';

interface IParams {
  lastIndex: number;
  category?: string;
}

export const getAllPosts = async ({ lastIndex }: IParams) => {
  try {
    const snapshot = await dbService
      .collection('posts')
      .orderBy('created_at', 'desc')
      .limit(lastIndex)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getPostsByCategory = async ({ lastIndex, category }: IParams) => {
  try {
    const snapshot = await dbService
      .collection('posts')
      .orderBy('created_at', 'desc')
      .where('category', '==', category)
      .limit(lastIndex)
      .get();

    return snapshot.docs.map((doc) => ({
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
    const snapshot = await dbService.collection('posts').get();
    return snapshot.docs.filter((doc) => doc.id === id)[0].data();
  } catch (error) {
    console.log(error);
    return;
  }
};
