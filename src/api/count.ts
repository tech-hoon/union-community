import { dbService } from 'service/firebase';

export const getUserPostCount = async () => {
  const res = await dbService.collection('counter').get();
  const [post, user] = res.docs.map((doc) => doc.data());

  if (!post || !user) {
    return { user: 0, post: 0 };
  }

  return { user: user.count, post: post.count };
};
