import Navbar from 'components/common/Navbar';
import Editor from 'components/common/Editor';
import usePostForm from 'hooks/usePostForm';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useRef } from 'react';
import { CATEGORY_LIST } from 'utils/config';
import { useLocation } from 'react-router';

interface ILocationState {
  id: string;
  title: string;
  category: string;
  content: string;
}

const UpdatePost = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const contentRef = useRef<ReactQuill | null>(null);
  const location = useLocation();
  const { title, category, content, id } = location.state as ILocationState;

  const { post, onEditorCancle, onSubmit } = usePostForm({
    titleRef,
    categoryRef,
    contentRef,
    mode: 'update',
    postId: id,
  });

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <PostContainer onSubmit={onSubmit}>
        <TitleInput ref={titleRef} placeholder='제목을 입력하세요' defaultValue={title} />
        <HR />

        <CategoryBox>
          <Label>카테고리: </Label>
          <Select ref={categoryRef} name='카테고리' defaultValue={category}>
            {CATEGORY_LIST.map(({ kor }, id) => (
              <Option value={kor} key={id}>
                {kor}
              </Option>
            ))}
          </Select>
        </CategoryBox>

        <Editor ref={contentRef} value={content} />

        <ButtonBox>
          <CancleBtn onClick={onEditorCancle}>취소하기</CancleBtn>
          <SubmitBtn type='submit'>수정하기</SubmitBtn>
        </ButtonBox>
      </PostContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PostContainer = styled.form`
  width: 95%;
  margin: 20px auto;
`;
const TitleInput = styled.input`
  font-weight: 700;
  font-size: 2em;
`;
const HR = styled.hr`
  margin: 20px 0;
`;
const Label = styled.label`
  font-weight: 700;
  font-size: 1em;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 20px 0;
`;

const Select = styled.select`
  width: 200px;
  font-size: 1em;
  padding: 8px;
`;
const Option = styled.option``;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3rem;
  gap: 4px;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1em;
  padding: 12px;
  border: 0.3px solid #eee;
  border-radius: 4px;
`;

const CancleBtn = styled(Button)`
  background-color: gray;
  color: white;
`;
const SubmitBtn = styled(Button)`
  background-color: skyblue;
  color: white;
`;

export default UpdatePost;
