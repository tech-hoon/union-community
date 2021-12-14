import styled from 'styled-components';

const N = {
  Wrapper: styled.div`
    margin: 20px 20px;
  `,

  Row1: styled.div`
    display: flex;
    align-items: center;
  `,

  Row2: styled.div`
    display: flex;
  `,

  Title: styled.h2`
    & small {
      color: #18a0fb;
    }
  `,

  Creator: styled.div``,

  Content: styled.h3``,

  Button: styled.button`
    padding: 4px 8px;
    border-radius: 4px;
    color: #18a0fb;
  `,
};

export default N;
