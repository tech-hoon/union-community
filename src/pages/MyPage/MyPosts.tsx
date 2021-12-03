import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { Book } from '@styled-icons/boxicons-regular';
import { getMyPosts } from 'api/user';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { loginUserType } from 'types';

const MyPosts = () => {
  const [posts, setPosts] = useState<any>();
  const loginUser = useRecoilValue(loginUserState) as loginUserType;

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
        <S.Header>
          <S.Title>
            <Book size='30px' />
            작성 목록
          </S.Title>
          <S.Subtitle>* 반영되는 데에는 최대 1분 정도 소요될 수 있습니다.</S.Subtitle>
        </S.Header>
        <S.PostCards posts={posts} mypage={true} />
      </S.Container>
    </S.Wrapper>
  );
};

const Wrapper = styled.div``;
const Container = styled.div``;

export default MyPosts;
