import { dbService } from 'service/firebase';

export const getUserPostCount = async () => {
  // const userDB = await dbService.doc(`users/${uid}`).get();
  // return userDB.data() ? userDB.data() : null;
  const userCount = await (await dbService.collection('users').get()).size;
  const postCount = await (await dbService.collection('posts').get()).size;
  return { userCount, postCount };
};
