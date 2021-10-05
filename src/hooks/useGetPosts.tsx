import { useState, useEffect } from 'react';
import { dbService } from 'service/firebase';
import { PostType } from 'types';

interface Props {
  lastIndex: number;
  callback: () => void;
}

const useGetPosts = ({ lastIndex, callback }: Props) => {
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    const unsubscribe = dbService
      .collection('posts')
      .orderBy('created_at', 'desc')
      .limit(lastIndex)
      .onSnapshot((snapshot) => {
        const newPosts: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
        callback(); // loading done
      });

    return () => unsubscribe();
  }, [lastIndex]);

  return { posts };
};

export default useGetPosts;
