import { Layouts as S } from 'pages/MyPage/Layouts';
import { BookHeart } from '@styled-icons/boxicons-regular';
import { useRecoilValueLoadable } from 'recoil';
import CardContainer from 'components/common/PostCardLayout/CardContainer';
import { myLikesState } from 'store/myPosts';

const MyLikes = () => {
  const postsLoadable = useRecoilValueLoadable(myLikesState);

  return (
    <S.Wrapper>
      <S.Navbar />

      <S.Container>
        <S.Header>
          <S.Title>
            <BookHeart size='30px' />
            좋아요 목록
          </S.Title>
        </S.Header>
        {postsLoadable.state === 'loading' ? (
          <S.PostCardSkeleton />
        ) : (
          <CardContainer posts={postsLoadable.contents} hideNickname={true} />
        )}
      </S.Container>
      <S.Footer />
    </S.Wrapper>
  );
};

export default MyLikes;
