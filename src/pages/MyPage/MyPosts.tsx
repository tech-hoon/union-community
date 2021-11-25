import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { Book } from '@styled-icons/boxicons-regular';

const MyPosts = () => {
  return (
    <S.Wrapper>
      <S.Navbar isLoggedIn={true} />
      <S.Container>
        <S.Title>
          <Book size='30px' />
          작성 목록
        </S.Title>
      </S.Container>
    </S.Wrapper>
  );
};

const Wrapper = styled.div``;
const Container = styled.div``;

export default MyPosts;
