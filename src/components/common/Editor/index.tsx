import styled from 'styled-components';
import { forwardRef } from 'react';

const Editor = forwardRef<any, any>(({ value }, contentRef) => {
  return (
    <Wrapper>
      <Container
        ref={contentRef}
        name='text'
        placeholder={`부적절한 게시물이 업로드될 시, 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.`}
        defaultValue={value?.replaceAll('<br/>', '\n')}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div``;

const Container = styled.textarea`
  width: 100%;
  height: 40vh;

  margin: 0 auto;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #b0b0b0;

  color: #292929;
  font-size: 1rem;
  resize: none;

  background-color: transparent;
  overflow: auto;
  outline: none;
  box-shadow: none;

  &::placeholder {
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    color: #b0b0b0;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 15px;
    }
  }
`;

export default Editor;
