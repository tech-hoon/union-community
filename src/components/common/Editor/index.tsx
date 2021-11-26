import styled from 'styled-components';
import { forwardRef } from 'react';

const Editor = forwardRef<any, any>(({ value }, contentRef) => {
  return (
    <Wrapper>
      <Container
        ref={contentRef}
        name='text'
        placeholder={`유니온은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.`}
        value={value.replaceAll('<br/>', '\n')}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div``;

const Container = styled.textarea`
  width: 100%;
  height: 350px;

  margin: 0 auto;
  padding: 12px;

  color: #292929;
  font-size: 1rem;
  resize: none;

  background-color: transparent;
  border: 1px solid #888;
  overflow: auto;
  outline: none;
  box-shadow: none;
`;

export default Editor;
