import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dbService } from 'service/firebase';
import { postsCategoryState, postsState } from 'store/posts';
import { PostType } from 'types';

interface Props {
  lastIndex: number;
  category?: string;
  callback: () => void;
}

const useGetPosts = ({ lastIndex, callback }: Props) => {
  const [posts, setPosts] = useRecoilState<PostType[]>(postsState);
  const [category] = useRecoilState(postsCategoryState);

  useEffect(() => {
    // 전체
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
            console.log(newPosts);
            console.log('API call');
            callback(); // loading done
          })
      : //카테고리 별
        dbService
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
            console.log('API call');
            callback(); // loading done
          });
  }, [lastIndex, category]);

  return { posts };
};

export default useGetPosts;
