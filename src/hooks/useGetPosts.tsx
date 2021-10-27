import { getPostDetail, getPostsByCategory, getAllPosts } from 'api/post';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postsCategoryState, postsOrderByState, postsLastIndex, postsState } from 'store/post';
import { PostType } from 'types';

export const useGetPosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [isLastPost, setIsLastPost] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);
  const lastIndex = useRecoilValue(postsLastIndex);

  const fetchPosts = async () => {
    const _posts: any = category
      ? await getPostsByCategory({ lastIndex, category, orderBy })
      : await getAllPosts({ lastIndex, orderBy });

    //더 이상 불러 올 게 없을 시
    if (_posts.length === posts?.length) {
      setIsLastPost(true);
      setIsLoading(false);
      return;
    }
    setPosts(_posts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [category, orderBy, lastIndex]);

  return {
    posts,
    setPosts,
    fetchPosts,
    isLoading,
    isLastPost,
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
