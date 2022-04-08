import styled from 'styled-components';

const Layouts = {
  Wrapper: styled.ul`
    min-height: 50vh;
  `,

  Message: styled.li`
    max-width: 888px;
    margin: 24px auto;
    padding: 16px;
    background: #ffffff;
    border-radius: 16px;
    position: relative;
    cursor: pointer;
    user-select: none;

    word-break: break-all;
    white-space: pre-line;

    @media ${({ theme }) => theme.size.mobile} {
      padding: 4px;
    }
  `,

  DeleteBtn: styled.button`
    font-size: 14px;
    font-weight: 400;
    color: black;
    padding: 12px 14px;
  `,

  DeleteAllButton: styled.button`
    font-size: 1rem;
    font-weight: bold;
    color: gray;
    padding: 0;
    margin: 0 0 4px auto;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.9rem;
    }
  `,

  Row1: styled.div`
    display: flex;
    align-items: center;

    margin: 12px;
    gap: 4px;
    line-height: 1.1;
  `,

  Row2: styled.div`
    display: flex;
    margin: 16px 12px;
    align-items: center;
    gap: 6px;
    line-height: 1.1;

    @media ${({ theme }) => theme.size.mobile} {
      flex-direction: column;
      align-items: baseline;
      gap: 16px;
    }
  `,

  IconWrapper: styled.div`
    display: flex;
    justify-content: center;
  `,

  Title: styled.h2`
    font-weight: bold;
    font-size: 1.1rem;
    margin-right: auto;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.85rem;
    }

    & small {
      color: #18a0fb;
      margin-right: 1.5px;
      height: 100%;
    }
  `,

  Creator: styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    color: gray;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.85rem;
    }
  `,

  Content: styled.div`
    font-weight: 500;
    line-height: 1.2;
    color: gray;

    word-break: break-all;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.85rem;
    }
  `,

  CreatedAt: styled.p`
    font-weight: 600;
    font-size: 0.9rem;
    color: gray;

    margin-left: auto;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.7rem;
    }
  `,

  Button: styled.button`
    color: #18a0fb;
    font-weight: bold;
    font-size: 1rem;

    padding: 0;
    margin 0 0 0 auto;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.9rem;
    }
  `,

  Row3: styled.div`
    display: flex;
    margin: 12px;
  `,

  Text: styled.div`
    margin: 40px 30px;
  `,
};

export default Layouts;
