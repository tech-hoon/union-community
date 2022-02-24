import { forwardRef, useCallback } from 'react';
import styled from 'styled-components';

const CustomTextarea = forwardRef((props: any, ref: any) => {
  const onChange = useCallback(() => {
    ref.current.style.height = '1px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, [ref]);

  return <TextArea onChange={onChange} {...props} ref={ref} />;
});

const TextArea = styled.textarea`
  font-size: 14px;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 12px;
  width: 100%;

  overflow: auto;
  outline: none;
  resize: none;

  &::placeholder {
    color: gray;
  }
`;

export default CustomTextarea;
