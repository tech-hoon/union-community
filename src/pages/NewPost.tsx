import Navbar from 'components/common/Navbar';
import Editor from 'components/NewPost/Editor';
import styled from 'styled-components';
import { ChangeEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import { checkValidation } from 'utils/validation';

interface Props {}

const NewPost = (props: Props) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.target.value);
  const onEditorChange = (_val: string) => setContent(_val);
  const onEditorCancle = () => window.confirm('글 작성을 취소하시겠습니까?') && history.push('/');
  const onCategoryChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    setCategory(e.target.value);
  const onSubmit = () => {
    if (checkValidation(title, category, content)) {
      console.log(title, category, content);
    } else {
      //TODO: API submit
      console.log('다 입력해주세여!');
    }
  };

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <PostContainer>
        <TitleInput placeholder='제목을 입력하세요' onChange={onTitleChange} />
        <HR />

        <CategoryBox>
          <Label>카테고리: </Label>
          <Select name='카테고리' value={category} onChange={onCategoryChange}>
            <Option disabled value=''>
              선택해주세요
            </Option>
            <Option value='자유'>자유</Option>
            <Option value='홍보'>홍보</Option>
            <Option value='동아리'>동아리</Option>
          </Select>
        </CategoryBox>

        <Editor content={content} onChange={onEditorChange} />

        <ButtonBox>
          <CancleBtn onClick={onEditorCancle}>취소하기</CancleBtn>
          <SubmitBtn onClick={onSubmit}>등록하기</SubmitBtn>
        </ButtonBox>
      </PostContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PostContainer = styled.div`
  width: 95%;
  margin: 20px auto;
`;
const TitleInput = styled.input`
  font-family: 'Spoqa Bold';
  font-size: 2em;
`;
const HR = styled.hr`
  margin: 20px 0;
`;
const Label = styled.label`
  font-family: 'Spoqa Bold';
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
  font-family: 'Spoqa Medium';
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
