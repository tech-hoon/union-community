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
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 4px;
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
};

export default Layouts;
