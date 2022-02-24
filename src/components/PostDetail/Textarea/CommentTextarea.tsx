import React, { forwardRef, useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  onSubmitComment: React.MouseEventHandler<HTMLButtonElement>;
}

const CommentTextarea = forwardRef(({ onSubmitComment }: Props, ref: any) => {
  const onChange = useCallback(() => {
    ref.current.style.height = '1px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, [ref]);

  return (
    <Wrapper>
      <TextArea
        onChange={onChange}
        ref={ref}
        placeholder='댓글을 입력해주세요.'
        spellCheck='false'
      />
      <SubmitBtn onClick={onSubmitComment} type='submit'>
        등록
      </SubmitBtn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: white;
  margin: 16px 0;
`;

const TextArea = styled.textarea`
  flex: 1;
  font-size: 14px;
  overflow: auto;
  outline: none;
  resize: none;
  border: none;
  background: none;
  padding: 0;

  &::placeholder {
    color: gray;
  }
`;

const SubmitBtn = styled.button`
  font-weight: 600;
  font-size: 1rem;
  padding: 4px 0px;
  border-radius: 4px;
  width: 60px;
  font-size: 0.8rem;
  padding: 10px 0;
  color: gray;

  @media ${({ theme }) => theme.size.mobile} {
    width: 40px;
    font-size: 13px;
  }
`;

export default CommentTextarea;
