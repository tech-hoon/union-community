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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    position: relative;
    cursor: pointer;
    &:hover {
      transform: scale(102%);
    }

    @media ${({ theme }) => theme.size.mobile} {
      padding: 4px;
      margin: 10px auto;
    }
  `,

  DeleteButton: styled.button`
    padding: 0;
    margin: 0;
    top: 6px;
    right: 12px;
    position: absolute;

    ::after {
      content: '❌';
    }
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
    color: gray;

    word-break: break-all;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.85rem;
    }
  `,

  CreatedAt: styled.p`
    font-weight: bold;
    font-size: 1rem;
    color: gray;

    margin-left: auto;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.8rem;
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
