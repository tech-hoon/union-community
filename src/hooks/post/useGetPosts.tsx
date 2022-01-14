import { getPostDetail, getInitialPosts, getMorePosts } from 'api/post';
import useDidUpdateEffect from 'hooks/common/useDidUpdateEffect';
import { useState, useEffect, useCallback } from 'react';
import { PostType } from 'types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  postsCategoryState,
  postsOrderByState,
  postsState,
  lastVisiblePostState,
} from 'store/post';
import { useHistory } from 'react-router-dom';
import { dbService } from 'service/firebase';

export const useGetPosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [lastVisiblePost, setLastVisiblePost] = useRecoilState(lastVisiblePostState);
  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);

  const [isLastPost, setIsLastPost] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsFetching(true);

    const response: any = await getInitialPosts({ orderBy, category });

    const __posts = response?.data;
    const __lastVisiblePost = response?.lastVisiblePost;

    setPosts(__posts);
    setLastVisiblePost(__lastVisiblePost);
    setIsFetching(false);
  }, [orderBy, category, lastVisiblePost]);

  const fetchMorePosts = async () => {
    if (lastVisiblePost) {
      setIsFetchingMore(true);

      const response: any = await getMorePosts({ orderBy, category, lastVisiblePost });
      const __posts = response?.data;
      const __lastVisiblePost = response?.lastVisiblePost;

      __posts && setPosts((prevPosts) => [...prevPosts, ...__posts]);
      setLastVisiblePost(__lastVisiblePost);
      setIsFetchingMore(false);
      return;
    }

    setIsLastPost(true);
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
    category,
    orderBy,
    lastVisiblePost,
    fetchPosts,
    fetchMorePosts,
    setPosts,
    isFetching,
    isFetchingMore,
    isLastPost,
  };
};

export const useGetPostDetail = () => {
  const history = useHistory();
  const [post, setPost] = useState<PostType>();

  const fetchPostDetail = async (id: string) => {
    const __post: any = await getPostDetail(id);
    const commentCount = (await dbService.collection(`posts/${id}/comments`).get()).size;

    if (!__post) {
      history.push('/not-found');
      return;
    }

    __post && setPost({ ...__post, comment_count: commentCount });
  };

  return {
    post,
    fetchPostDetail,
  };
};
