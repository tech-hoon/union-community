import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { Book } from '@styled-icons/boxicons-regular';
import { getMyPosts } from 'api/user';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';

const MyPosts = () => {
  const [posts, setPosts] = useState<any>();
  const loginUser = useRecoilValue(loginUserState);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const __posts = await getMyPosts(loginUser.uid);
      setPosts(__posts);
    };

    fetchMyPosts();
  }, []);
  return (
    <S.Wrapper>
      <S.Navbar isLoggedIn={true} />
      <S.Container>
        <S.Title>
          <Book size='30px' />
          작성 목록
        </S.Title>
        <S.PostCards posts={posts} />
      </S.Container>
    </S.Wrapper>
  );
};

const Wrapper = styled.div``;
const Container = styled.div``;

export default MyPosts;
