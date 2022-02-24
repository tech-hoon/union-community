import styled from 'styled-components';

const Button = styled.button`
  font-size: 1rem;
  height: 2rem;
  padding: 0 20px;
  border-radius: 4px;
`;

const S = {
  Wrapper: styled.div`
    width: 300px;
    height: 200px;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 36px;
    background-color: white;
    border-radius: 8px;

    overflow: hidden;
    user-select: none;
  `,

  Input: styled.input`
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid black;
    font-size: 1rem;
  `,

  Title: styled.h2`
    font-size: 1rem;
    font-weight: 600;
    & small {
      color: '18A0FB';
    }
  `,

  ButtonBox: styled.div`
    display: flex;
    gap: 12px;
  `,

  OkayButton: styled(Button)`
    background-color: #262626;
    color: white;

    &:disabled {
      cursor: default;
      background-color: #ccc;
    }
  `,
  CancelButton: styled(Button)`
    background-color: #e9ecef;
    color: black;
  `,
};

export default S;
