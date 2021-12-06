import { Layouts as S } from 'components/Mypage/Layouts';
import { BookHeart } from '@styled-icons/boxicons-regular';
import { useState, useEffect } from 'react';
import { getMyLikes } from 'api/user';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';

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
      <S.Navbar isLoggedIn={true} />

      <S.Container>
        <S.Header>
          <S.Title>
            <BookHeart size='30px' />
            좋아요 목록
          </S.Title>
          <S.Subtitle>* 반영되는 데에는 최대 1분 정도 소요될 수 있습니다.</S.Subtitle>
        </S.Header>
        {isLoading ? <S.CardSkeleton /> : <S.PostCards posts={posts} mypage={true} />}
      </S.Container>
    </S.Wrapper>
  );
};

export default MyLikes;
