import { getPostDetail, getPostsByCategory, getAllPosts } from 'api/post';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
    const fetchPosts = async () => {
      const _posts: any = category
        ? await getPostsByCategory({ lastIndex, category, orderBy })
        : await getAllPosts({ lastIndex, orderBy });
      setPosts(_posts);
    };

    fetchPosts();
  }, [category, orderBy, lastIndex]);

  return {
    posts,
  };
};

export const useGetPostDetail = (id: string) => {
  const [post, setPost] = useState<PostType>();
  const category = useRecoilValue(postsCategoryState);

  useEffect(() => {
    const fetchPostDetail = async () => {
      const _post: any = await getPostDetail(id);
      setPost(_post);
    };

    fetchPostDetail();
  }, [category]);

  return {
    post,
  };
};
