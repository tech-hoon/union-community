import { dbService } from 'service/firebase';

export const getUserPostCount = async () => {
  const userCount = (await dbService.collection('users').get()).size;
  const postCount = (await dbService.collection('posts').get()).size;
  return { userCount, postCount };
};
