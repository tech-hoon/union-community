import { Layouts as S } from 'components/Mypage/Layouts';
import { BookHeart } from '@styled-icons/boxicons-regular';
import { useState, useEffect } from 'react';
import { getMyLikes } from 'api/user';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { loginUserType } from 'types';

const MyLikes = () => {
  const loginUser = useRecoilValue(loginUserState) as loginUserType;
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    const fetchMyLikes = async () => {
      const __posts = await getMyLikes(loginUser.uid);
      setPosts(__posts);
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

        <S.PostCards posts={posts} mypage={true} />
      </S.Container>
    </S.Wrapper>
  );
};

export default MyLikes;
