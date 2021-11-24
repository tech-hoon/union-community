import { dbService } from 'service/firebase';

export const getUserPostCount = async () => {
  const res = await dbService.collection('counter').get();
  const [post, user] = res.docs.map((doc) => doc.data());
  return { userCount: user.count, postCount: post.count };
};
