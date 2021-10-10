import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { dbService } from 'service/firebase';
import { postsCategoryState, postsOrderByState } from 'store/post';
import { PostType } from 'types';

interface Props {
  lastIndex: number;
}

export const useGetPosts = ({ lastIndex }: Props) => {
  const [posts, setPosts] = useState<PostType[]>();
  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);

  useEffect(() => {
    category
      ? dbService
          .collection('posts')
          .orderBy(orderBy, 'desc')
          .limit(lastIndex)
          .where('category', '==', category)
          .onSnapshot((snapshot) => {
            const newPosts: any = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPosts(newPosts);
          })
      : dbService
          .collection('posts')
          .orderBy(orderBy, 'desc')
          .limit(lastIndex)
          .onSnapshot((snapshot) => {
            const newPosts: any = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPosts(newPosts);
          });
  }, [category, orderBy, lastIndex]);

  return {
    posts,
  };
};

export const useGetPostDetail = (id: string) => {
  const [post, setPost] = useState<PostType>();
  const category = useRecoilValue(postsCategoryState);

  useEffect(() => {
    dbService
      .collection('posts')
      .get()
      .then((snapshot) => {
        const _post: any = snapshot.docs.filter((doc) => doc.id === id)[0].data();
        setPost(_post);
      });
  }, [category]);

  return {
    post,
  };
};
