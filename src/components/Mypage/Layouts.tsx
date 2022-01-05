import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import PostCardSkeleton from 'components/common/Skeletons/PostCardSkeleton';
import PostCardBox from 'components/common/PostCard/PostCardBox';

import styled from 'styled-components';

export const Layouts = {
  Wrapper: styled.div``,
  Navbar: styled(Navbar)``,
  Container: styled.div`
    max-width: 1160px;
    padding: 0 60px;
    margin: auto;

    @media ${({ theme }) => theme.size.mobile} {
      width: 95%;
      padding: 0;
    }
  `,

  Header: styled.header`
    margin: 30px 0px;
    display: flex;
    gap: 32px;
    align-items: center;

    @media ${({ theme }) => theme.size.mobile} {
      flex-direction: column;
      align-items: baseline;
      margin: 16px 4px;
      gap: 20px;
    }
  `,

  IconWrapper: styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Title: styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 4px;
    height: 30px;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 1.2rem;
    }
  `,

  Subtitle: styled.h2`
    font-size: 1.2rem;
    color: gray;
    font-weight: 500;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 1rem;
    }
  `,

  Body: styled.div`
    margin-top: 50px;
    float: left;
  `,

  PostCards: styled(PostCardBox)`
    grid-template-columns: 1fr 1fr 1fr;

    @media ${({ theme }) => theme.size.tablet} {
      grid-template-columns: 1fr 1fr;
    }

    @media ${({ theme }) => theme.size.mobile} {
      grid-template-columns: 1fr;
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

  Text: styled.div`
    margin: 40px 30px;
    font-size: 1.1rem;
  `,

  PostCardSkeleton: styled(PostCardSkeleton)``,

  Footer: styled(Footer)``,
};
