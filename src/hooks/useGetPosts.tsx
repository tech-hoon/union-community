import { getPostDetail, getInitialPosts, getMorePosts } from 'api/post';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postsCategoryState, postsOrderByState, postsState } from 'store/post';
import { PostType } from 'types';

export const useGetPosts = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [lastVisible, setLastVisible] = useState<number | null>();
  const [isLastPost, setIsLastPost] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const category = useRecoilValue(postsCategoryState);
  const orderBy = useRecoilValue(postsOrderByState);

  const fetchPosts = async () => {
    const res: any = await getInitialPosts({ category, orderBy });

    if (res) {
      const __posts = res?.documentData;
      const __lastVisible = res?.lastVisible;

      setPosts(__posts);
      setLastVisible(__lastVisible);
      setIsLoading(false);
      return;
    }

    setPosts([]);
    setLastVisible(null);
    setIsLoading(false);
  };

  //TODO
  //마지막 데이터 처리
  const fetchMorePosts = async () => {
    const res: any = await getMorePosts({
      lastVisible,
      category,
      orderBy,
    });

    if (res) {
      const __posts = res.documentData;
      const __lastVisible = res.lastVisible;

      setPosts((prevPosts) => [...prevPosts, ...__posts]);
      setLastVisible(__lastVisible);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category, orderBy]);

  return {
    posts,
    lastVisible,
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
