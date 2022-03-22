import styled from 'styled-components';
import { Layouts as S } from 'pages/MyPage/Layouts';
import { Book } from '@styled-icons/boxicons-regular';
import { useRecoilValueLoadable } from 'recoil';
import CardContainer from 'components/common/PostCardLayout/CardContainer';
import { myPostsState } from 'store/myPosts';

const MyPosts = () => {
  const postsLoadable = useRecoilValueLoadable(myPostsState);

  return (
    <S.Wrapper>
      <S.Navbar />
      <S.Container>
        <S.Header>
          <S.Title>
            <Book size='30px' />
            작성 목록
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

const Wrapper = styled.div``;
const Container = styled.div``;

export default MyPosts;
