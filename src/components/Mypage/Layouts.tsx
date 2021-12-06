import Navbar from 'components/common/Navbar';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';
import PostCardBox from 'components/Home/PostCardBox';
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
    margin: 30px 20px;
    display: flex;
    gap: 32px;
    align-items: center;

    @media ${({ theme }) => theme.size.mobile} {
      flex-direction: column;
      align-items: baseline;
      gap: 20px;
    }
  `,

  Title: styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 4px;
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

  CardSkeleton: styled(CardSkeleton)``,
};
