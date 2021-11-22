import { getPostDetail, getInitialPosts, getMorePosts } from 'api/post';
import useDidUpdateEffect from 'hooks/common/useDidUpdateEffect';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  postsCategoryState,
  postsOrderByState,
  postsState,
  lastVisiblePostState,
  getPostsSelector,
} from 'store/post';
import { PostType } from 'types';

export const useGetPosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [lastVisiblePost, setLastVisiblePost] = useRecoilState(lastVisiblePostState);
  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);

  const [isLastPost, setIsLastPost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    const response: any = await getInitialPosts({ orderBy, category });
    const __posts = response?.data;
    const __lastVisiblePost = response?.lastVisiblePost;

    setPosts(__posts);
    setLastVisiblePost(__lastVisiblePost);
    setIsLoading(false);
  }, [orderBy, category, lastVisiblePost]);

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

  //첫 렌더링시, 캐싱된 post있으면 그거로 사용
  useEffect(() => {
    !posts.length && fetchPosts();
  }, []);

  //category, orderBy 바뀐거로 fetch
  useDidUpdateEffect(() => {
    fetchPosts();
  }, [category, orderBy]);

  return {
    posts,
    lastVisiblePost,
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
    _post && setPost(_post);
  };

  return {
    post,
    fetchPostDetail,
  };
};
