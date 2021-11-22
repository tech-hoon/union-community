import Navbar from 'components/common/Navbar';
import Editor from 'components/common/Editor';
import usePostForm from 'hooks/post/usePostForm';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useRef } from 'react';
import { CATEGORY_LIST } from 'utils/config';

interface Props {}

const NewPost = (props: Props) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const contentRef = useRef<ReactQuill | null>(null);
  const { post, onEditorCancle, onSubmit } = usePostForm({
    titleRef,
    categoryRef,
    contentRef,
    mode: 'add',
  });

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <PostContainer onSubmit={onSubmit}>
        <TitleInput ref={titleRef} placeholder='제목을 입력하세요' />
        <HR />

        <CategoryBox>
          <Label>카테고리: </Label>
          <Select ref={categoryRef} name='카테고리' defaultValue='자유'>
            {CATEGORY_LIST.map(({ kor }, id) => (
              <Option value={kor} key={id}>
                {kor}
              </Option>
            ))}
          </Select>
        </CategoryBox>

        <Editor ref={contentRef} />

        <ButtonBox>
          <CancleBtn onClick={onEditorCancle}>취소하기</CancleBtn>
          <SubmitBtn type='submit'>등록하기</SubmitBtn>
        </ButtonBox>
      </PostContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PostContainer = styled.form`
  max-width: 1120px;
  padding: 40px 60px;
  margin: 0 auto;

  @media ${({ theme }) => theme.size.mobile} {
    width: 90%;
    padding: 20px 0;
  }
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

export default NewPost;
