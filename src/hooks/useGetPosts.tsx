import { useState, useEffect } from 'react';
import { dbService } from 'service/firebase';
import { PostType } from 'types';

interface Props {
  lastIndex: number;
  category?: string;
  callback: () => void;
}

const useGetPosts = ({ lastIndex, category, callback }: Props) => {
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    category
      ? dbService
          .collection('posts')
          .orderBy('created_at', 'desc')
          .where('category', '==', category)
          .limit(lastIndex)
          .get()
          .then((snapshot) => {
            const newPosts: any = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPosts(newPosts);
            callback(); // loading done
          })
      : dbService
          .collection('posts')
          .orderBy('created_at', 'desc')
          .limit(lastIndex)
          .get()
          .then((snapshot) => {
            const newPosts: any = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPosts(newPosts);
            callback(); // loading done
          });
  }, [lastIndex]);

  return { posts };
};

export default useGetPosts;
