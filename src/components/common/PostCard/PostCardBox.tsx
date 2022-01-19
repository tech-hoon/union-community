import { memo } from 'react';
import { PostType } from 'types';
import { useHistory } from 'react-router-dom';
import { categoryColor } from 'utils/categoryColor';

import { Layouts as S } from './Layouts';

interface Props {
  posts: PostType[] | [];
  mypage?: boolean;
}

const PostCardBox = ({ posts, mypage = false }: Props) => {
  const history = useHistory();

  const handleClick = (id: string) => {
    history.push(`posts/${id}`);
  };

  return (
    <S.Wrapper>
      {posts?.length ? (
        posts?.map(
          (
            {
              id,
              category,
              title,
              content,
              creator,
              visitor_list,
              liker_list,
              comment_count,
              attachment_url,
            },
            key
          ) => {
            return (
              <S.PostCard key={key} onClick={() => handleClick(id!!)}>
                <S.Head>
                  <S.Title>{title}</S.Title>
                  {!!attachment_url && <S.ImageIcon size='24px' />}
                  <S.Category color={categoryColor(category)}>{category}</S.Category>
                </S.Head>
                <S.Content dangerouslySetInnerHTML={{ __html: content }} />
                <S.CardBottom>
                  {!mypage && (
                    <S.CreatorBox>
                      <S.AvatarWrapper>
                        <S.Avatar avatarId={category === '비밀' ? -1 : creator.avatar_id} />
                      </S.AvatarWrapper>
                      <S.Creator isSecret={category === '비밀'}>
                        {category === '비밀' ? '익명' : creator.nickname}
                      </S.Creator>
                    </S.CreatorBox>
                  )}
                  <S.CountBox>
                    <S.ViewCount count={visitor_list.length} />
                    <S.CommentCount count={comment_count} />
                    <S.LikeCount count={liker_list.length} />
                  </S.CountBox>
                </S.CardBottom>
              </S.PostCard>
            );
          }
        )
      ) : (
        <h2>게시물이 없습니다.</h2>
      )}
    </S.Wrapper>
  );
};

export default memo(PostCardBox);
