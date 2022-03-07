import { memo } from 'react';
import { PostType, ProductPostType } from 'types';
import { useHistory } from 'react-router-dom';

import { Layouts as S } from './Layouts';
import PostCard from './PostCard';
import ProductCard from './ProductCard';

interface Props {
  posts: (PostType | ProductPostType)[] | [];
  hideNickname?: boolean;
}

const CardContainer = ({ posts, hideNickname = false }: Props) => {
  const history = useHistory();

  const handleClick = (id: string) => {
    history.push(`posts/${id}`);
  };

  return (
    <S.Wrapper>
      <S.Container>
        {posts?.length ? (
          posts.map((post, key) =>
            post.category === '장터/나눔' ? (
              <ProductCard
                post={post as ProductPostType}
                onClick={handleClick}
                key={key}
                hideNickname={hideNickname}
              />
            ) : (
              <PostCard
                post={post as PostType}
                onClick={handleClick}
                key={key}
                hideNickname={hideNickname}
              />
            )
          )
        ) : (
          <S.NoPost>게시물이 없습니다.</S.NoPost>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default memo(CardContainer);
