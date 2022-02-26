import { forwardRef, useCallback } from 'react';
import styled from 'styled-components';

const CustomTextarea = forwardRef((props: any, ref: any) => {
  const onChange = useCallback(() => {
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, [ref]);

  return (
    <Wrapper>
      <TextArea onChange={onChange} {...props} ref={ref} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: white;
  margin: 16px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  border: none;
  overflow: auto;
  outline: none;
  resize: none;

  &::placeholder {
    color: gray;
  }
`;

export default CustomTextarea;
