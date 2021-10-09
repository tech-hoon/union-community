import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  postsSelector,
  postsCategoryState,
  postsState,
  postState,
  postDetailSelector,
} from 'store/post';
import { PostType } from 'types';

interface IGetPosts {
  lastIndex: number;
  category?: string;
}

interface IGetPost {
  id: string;
}

export const useGetPosts = ({ lastIndex }: IGetPosts) => {
  const [posts, setPosts] = useRecoilState<PostType[]>(postsState);
  const category = useRecoilValue(postsCategoryState);
  const postsLoadable = useRecoilValueLoadable(postsSelector({ category, lastIndex }));

  if (postsLoadable.state === 'hasValue') {
    setPosts(postsLoadable.contents);
  } else {
  }

  return { posts };
};

export const useGetPostDetail = ({ id }: IGetPost) => {
  const [post, setPost] = useRecoilState<PostType>(postState);
  const postLoadable = useRecoilValueLoadable(postDetailSelector({ id }));

  if (postLoadable.state === 'hasValue') {
    setPost(postLoadable.contents);
  } else {
  }

  return { post };
};
