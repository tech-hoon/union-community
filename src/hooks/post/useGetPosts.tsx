import { getPostDetail, getInitialPosts, getMorePosts } from 'api/post';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  postsCategoryState,
  postsOrderByState,
  postsState,
  lastVisiblePostState,
} from 'store/post';
import { PostType } from 'types';

export const useGetPosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [lastVisiblePost, setLastVisiblePost] = useRecoilState(lastVisiblePostState);
  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);

  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [isLastPost, setIsLastPost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (isInitial?: boolean) => {
    if (!posts.length || !isInitial) {
      const response: any = await getInitialPosts({ orderBy, category });

      const __posts = response?.data;
      const __lastVisiblePost = response?.lastVisiblePost;

      setPosts(__posts);
      setLastVisiblePost(__lastVisiblePost);
      setIsLoading(false);

      return;
    }

    setPosts(posts);
    setLastVisiblePost(lastVisiblePost);
    setIsLoading(false);
  };

  const fetchMorePosts = async () => {
    if (lastVisiblePost) {
      const response: any = await getMorePosts({ orderBy, category, lastVisiblePost });
      const __posts = response?.data;
      const __lastVisiblePost = response?.lastVisiblePost;

      __posts && setPosts((prevPosts) => [...prevPosts, ...__posts]);
      setLastVisiblePost(__lastVisiblePost);
      setIsLoading(false);
      return;
    }
  };

  const updatePosts = async () => {
    const response: any = await getInitialPosts({ orderBy, category });
    const __posts = response?.data;
    const __lastVisiblePost = response?.lastVisiblePost;

    setPosts(__posts);
    setLastVisiblePost(__lastVisiblePost);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts(isInitial);
    setIsInitial(false);
  }, [category, orderBy]);

  return {
    posts,
    lastVisiblePost,
    fetchPosts,
    fetchMorePosts,
    updatePosts,
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
