import { getPostDetail, getInitialPosts, getMorePosts } from 'api/post';
import usePrevious from 'hooks/common/usePrevious';

import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { postsCategoryState, postsOrderByState, postsState } from 'store/post';
import { PostType } from 'types';

export const useGetPosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [lastVisiblePost, setLastVisiblePost] =
    useState<firebase.default.firestore.QuerySnapshot>();

  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);

  const [isLastPost, setIsLastPost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (isUpdated?: boolean) => {
    //1. 첫 렌더링
    //2. 최근 게시물 업데이트
    //3. 정렬 or 카테고리 변경 시(TODO)
    //-> API 호출

    if (!posts.length || isUpdated) {
      const response: any = await getInitialPosts({ orderBy, category });
      const __posts = response?.data;
      const __lastVisiblePost = response?.lastVisiblePost;

      setPosts(__posts);
      setLastVisiblePost({ ...__lastVisiblePost });
      return;
    }

    setPosts(posts);
    setLastVisiblePost(lastVisiblePost);
  };

  const fetchMorePosts = async () => {
    if (!!lastVisiblePost) {
      const response: any = await getMorePosts({ orderBy, category, lastVisiblePost });
      const __posts = response?.data;
      const __lastVisiblePost = response?.lastVisiblePost;

      setPosts((prevPosts) => [...prevPosts, ...__posts]);
      setLastVisiblePost(__lastVisiblePost);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
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
    setPost(_post);
  };

  return {
    post,
    fetchPostDetail,
  };
};
