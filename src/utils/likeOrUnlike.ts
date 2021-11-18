export const likeOrUnlike = (liker_list: string[], uid: string) => {
  return liker_list.includes(uid) ? 'unlike' : 'like';
};
