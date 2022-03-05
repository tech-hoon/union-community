import { Layouts as S } from 'pages/MyPage/Layouts';
import { BookHeart } from '@styled-icons/boxicons-regular';
import { useState, useEffect } from 'react';
import { getMyLikes } from 'api/user';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';
import CardContainer from 'components/common/PostCardLayout/CardContainer';

const MyLikes = () => {
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  const [posts, setPosts] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMyLikes = async () => {
      const __posts = await getMyLikes(loginUser.uid);
      setPosts(__posts);
      setIsLoading(false);
    };

    fetchMyLikes();
  }, []);

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
        {isLoading ? <S.PostCardSkeleton /> : <CardContainer posts={posts} />}
      </S.Container>
      <S.Footer />
    </S.Wrapper>
  );
};

export default MyLikes;
