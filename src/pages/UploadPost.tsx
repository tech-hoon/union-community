import Navbar from 'components/common/Navbar';
import Editor from 'components/common/Editor';
import usePostForm from 'hooks/post/usePostForm';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react';
import { PhotoLibrary } from '@styled-icons/material-outlined';
import { CATEGORY_LIST } from 'utils/config';
import { PostType } from 'types';

interface ILocationState {
  mode: string;
  initialPost?: PostType | null;
}

const UploadPost = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const location = useLocation();
  const { mode, initialPost } = location.state as ILocationState;

  useEffect(() => {
    initialPost?.attachment_url && setAttachment(initialPost.attachment_url);
  }, []);

  const { setAttachment, attachment, onEditorCancle, onSubmit, onFileChange, onDeleteAttachment } =
    usePostForm({
      titleRef,
      categoryRef,
      contentRef,
      mode,
      prevPost: initialPost || null,
    });

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <PostContainer onSubmit={onSubmit}>
        <TitleInput
          ref={titleRef}
          placeholder='제목을 입력하세요'
          defaultValue={initialPost?.title || ''}
        />
        <HR />

        <CategoryBox>
          <Label>카테고리: </Label>
          <Select ref={categoryRef} name='카테고리' defaultValue={initialPost?.category || '자유'}>
            {CATEGORY_LIST.map(({ kor }, id) => (
              <Option value={kor} key={id}>
                {kor}
              </Option>
            ))}
          </Select>
          <UploadImageBtn htmlFor='upload-image'>
            <PhotoLibrary />
          </UploadImageBtn>
          <UploadInput id='upload-image' type='file' accept='image/*' onChange={onFileChange} />
        </CategoryBox>

        <Editor ref={contentRef} value={initialPost?.content || null} />
        {attachment && (
          <ThumbnailsBox>
            <ThumbnailWrapper>
              <Thumbnail src={attachment} alt='' />
              <ThumbnailDeleteBtn onClick={onDeleteAttachment} type='button'>
                ❌
              </ThumbnailDeleteBtn>
            </ThumbnailWrapper>
          </ThumbnailsBox>
        )}
        <ButtonBox>
          <CancleBtn type='button' onClick={onEditorCancle}>
            취소하기
          </CancleBtn>
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

const UploadImageBtn = styled.label`
  width: 24px;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

const ThumbnailsBox = styled.ol`
  width: 100%;
  border: 1px solid #888;
  padding: 8px;
`;

const ThumbnailDeleteBtn = styled.button`
  display: none;
  font-size: 0.8rem;
  position: absolute;
  top: -10px;
  right: -10px;
  color: red;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const ThumbnailWrapper = styled.li`
  width: 100px;
  position: relative;
  padding: 8px;
  border: 1px solid #888;

  &:hover ${ThumbnailDeleteBtn} {
    display: block;
  }
`;

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

export default UploadPost;
