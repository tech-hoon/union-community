import { getPostDetail, getInitialPosts, getMorePosts } from 'api/post';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postsCategoryState, postsOrderByState, postsPageIndex, postsState } from 'store/post';
import { PostType } from 'types';
import useDidUpdateEffect from './useDidUpdateEffect';

export const useGetPosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [lastKey, setLastKey] = useState();
  const [isLastPost, setIsLastPost] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);
  const index = useRecoilValue(postsPageIndex);

  const fetchPosts = async () => {
    const { posts, lastDoc }: any = await getInitialPosts({ category, orderBy });

    setPosts(posts);
    setLastKey(lastDoc);
    setIsLoading(false);
  };

  //TODO
  //마지막 데이터 처리
  const fetchMorePosts = useCallback(async () => {
    const { posts, lastDoc }: any = await getMorePosts({
      lastVisible: lastKey,
      category,
      orderBy,
    });

    setPosts((prevPosts) => [...prevPosts, ...posts]);
    setLastKey(lastDoc);
    setIsLoading(false);
  }, [lastKey]);

  useEffect(() => {
    fetchPosts();
  }, [category, orderBy]);

  useDidUpdateEffect(() => {
    // lastKey && fetchMorePosts();
  }, [lastKey]);

  return {
    posts,
    lastKey,
    fetchPosts,
    fetchMorePosts,
    setPosts,
    isLoading,
    isLastPost,
  };
};

export const useGetPostDetail = (id: string) => {
  const [post, setPost] = useState<PostType>();

  const fetchPostDetail = async (id: string) => {
    const _post: any = await getPostDetail(id);
    setPost(_post);
  };

  return {
    post,
    fetchPostDetail,
  };
};
