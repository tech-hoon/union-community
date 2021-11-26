import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import styled from 'styled-components';

export const Layouts = {
  Wrapper: styled.div``,
  Navbar: styled(Navbar)``,
  Container: styled.div`
    max-width: 1000px;
    padding: 0 60px;
    margin: auto;
  `,

  Title: styled.div`
    margin-top: 50px;
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  Body: styled.div`
    margin-top: 50px;
    float: left;
  `,

  PostCards: styled(PostCardBox)`
    grid-template-columns: 1fr;

    @media ${({ theme }) => theme.size.desktop} {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media ${({ theme }) => theme.size.mobile} {
      grid-template-columns: 1fr 1fr;
    }
  `,

  Button: styled.button`
    width: 100px;
    border-radius: 4px;
    color: white;
    height: 2rem;
    font-size: 1rem;
    font-weight: 600;
  `,
};

export default Layouts;
