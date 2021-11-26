import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { BookHeart } from '@styled-icons/boxicons-regular';
import { useState, useEffect } from 'react';
import { getMyLikes } from 'api/user';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';

const MyLikes = () => {
  const [posts, setPosts] = useState<any>();
  const loginUser = useRecoilValue(loginUserState);

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
        <S.Title>
          <BookHeart size='30px' />
          좋아요 목록
        </S.Title>
        <S.PostCards posts={posts} />
      </S.Container>
    </S.Wrapper>
  );
};

export default MyLikes;
