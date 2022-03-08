import styled from 'styled-components';

const Button = styled.button`
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
  padding: 10px;
  color: white;
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

  Textarea: styled.textarea`
    width: 100%;
    font-size: 14px;
    border: none;
    overflow: auto;
    outline: none;
    resize: none;

    padding: 8px;
    border: 1px solid gray;
    border-radius: 4px;
    margin-bottom: 8px;
    background-color: white;
    margin: 16px 0;

    &::placeholder {
      color: gray;
    }
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
    width: 80%;
    justify-content: center;
  `,

  OkayButton: styled(Button)`
    background-color: #18a0fb;
    border: 1px solid #18a0fb;
    color: white;

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  `,
  CancelButton: styled(Button)`
    background-color: white;
    border: 1px solid #ff0000;
    color: #ff0000;
    font-weight: 400;
  `,
};

export default S;
