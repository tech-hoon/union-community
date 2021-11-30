import { dbService } from 'service/firebase';

export const getUserPostCount = async () => {
  const res = await dbService.collection('counter').get();
  const [post, user] = res.docs.map((doc) => doc.data());

  if (!post || !user) {
    return { userCount: 0, postCount: 0 };
  }

  return { userCount: user.count, postCount: post.count };
};
