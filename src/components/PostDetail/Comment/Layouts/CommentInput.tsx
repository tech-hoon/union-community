import { forwardRef } from 'react';
import styled from 'styled-components';

const S = {
  Input: styled.textarea`
    font-size: 1rem;
    padding: 8px;
    border: 1px solid gray;
    border-radius: 4px;
    margin: 10px 0;
    width: 100%;

    overflow: auto;
    outline: none;
    resize: none;

    &::placeholder {
      color: gray;
    }
  `,
};

const CommentInput = forwardRef((props: any, ref) => <S.Input {...props} ref={ref} />);

export default CommentInput;
