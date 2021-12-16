import styled from 'styled-components';

const Layouts = {
  Wrapper: styled.ul``,

  Message: styled.ol`
    max-width: 1160px;
    margin: 24px auto;
    padding: 8px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    position: relative;
  `,

  DeleteButton: styled.button`
    padding: 0;
    margin: 0;
    top: 3px;
    right: 9px;
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
    margin: 0 0 0 auto;
  `,

  Row1: styled.div`
    display: flex;
    align-items: center;
    margin : 16px; 0;
    gap:4px;
    line-height:1.1;
  `,

  Row2: styled.div`
    display: flex;
    margin : 16px; 0;
    align-items: center;
    gap:4px;
    line-height:1.1;
  `,

  IconWrapper: styled.div`
    width: 32px;
    display: flex;
    justify-content: center;
  `,

  Title: styled.h2`
    font-weight: bold;
    font-size: 1.1rem;
    line-height: 1.1;

    & small {
      color: #18a0fb;
      margin-right: 1px;
      height: 100%;
    }
  `,

  Creator: styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    color: gray;

    ::after {
      content: ' : ';
    }
  `,

  Content: styled.h3`
    font-weight: bold;
    font-size: 1.1rem;
    color: gray;
  `,

  CreatedAt: styled.p`
    font-weight: bold;
    font-size: 1rem;
    color: gray;

    margin-left: auto;
  `,

  Button: styled.button`
    color: #18a0fb;
    font-weight: bold;
    font-size: 1rem;

    padding: 0;
    margin 0 0 0 auto;
  `,

  Text: styled.div`
    margin: 40px 30px;
  `,
};

export default Layouts;
