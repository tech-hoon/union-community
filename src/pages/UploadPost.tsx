import Navbar from 'components/common/Navbar';
import Editor from 'components/common/Editor';
import usePostForm from 'hooks/post/usePostForm';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react';
import { PhotoLibrary } from '@styled-icons/material-outlined';
import { CATEGORY_LIST } from 'utils/config';
import Circle from 'components/common/Loading/Circle';
import { Cancel } from '@styled-icons/material';

interface ILocationState {
  mode: 'add' | 'update';
  initialPost?: any;
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

  const {
    setAttachment,
    attachment,
    errorInfo,
    onEditorCancle,
    onSubmit,
    onFileChange,
    onDeleteAttachment,
    isUploading,
  } = usePostForm({
    titleRef,
    categoryRef,
    contentRef,
    mode,
    prevPost: initialPost || null,
  });
  return (
    <Wrapper>
      <Navbar />
      <PostContainer onSubmit={onSubmit}>
        <TitleInput
          ref={titleRef}
          placeholder='제목을 입력하세요'
          defaultValue={initialPost?.title || ''}
        />
        <HR />

        <CategoryBox>
          <Label>카테고리: </Label>
          <Select ref={categoryRef} name='카테고리' defaultValue={initialPost?.category || ''}>
            <Option disabled value=''>
              카테고리를 선택해주세요
            </Option>
            {CATEGORY_LIST.map(({ kor }, id) => {
              return (
                kor !== '전체' && (
                  <Option value={kor} key={id}>
                    {kor}
                  </Option>
                )
              );
            })}
          </Select>
          <UploadImageBtn htmlFor='upload-image'>
            <PhotoLibrary />
          </UploadImageBtn>
          <UploadInput id='upload-image' type='file' accept='image/*' onChange={onFileChange} />
        </CategoryBox>

        <Editor ref={contentRef} value={initialPost?.content || null} />

        {attachment && (
          <ThumbnailsBox>
            <ThumbnailTitle>첨부 사진</ThumbnailTitle>
            <ThumbnailWrapper>
              <Thumbnail src={attachment} alt='' />
              <ThumbnailDeleteBtn onClick={onDeleteAttachment} type='button'>
                <Cancel size='20px' />
              </ThumbnailDeleteBtn>
            </ThumbnailWrapper>
          </ThumbnailsBox>
        )}
        <ButtonBox>
          {!isUploading ? (
            <>
              <CancleBtn type='button' onClick={onEditorCancle}>
                취소하기
              </CancleBtn>
              <SubmitBtn type='submit'>등록하기</SubmitBtn>
            </>
          ) : (
            <Circle />
          )}
        </ButtonBox>
        <ErrorInfo>{errorInfo}</ErrorInfo>
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
  width: 100%;
  font-weight: 700;
  font-size: 2rem;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.5rem;
  }
`;
const HR = styled.hr`
  margin: 12px 0;
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

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8rem;
    gap: 12px;
  }
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
  /* width: 100%; */
  /* border: 1px solid #888; */
  /* padding: 8px; */
`;

const ThumbnailTitle = styled.div`
  margin: 12px 2px;
  font-weight: 700;
  font-size: 1em;
`;

const ThumbnailDeleteBtn = styled.button`
  display: block;
  font-size: 0.8rem;
  position: absolute;
  top: -10px;
  right: -14px;
  color: gray;
`;

const Thumbnail = styled.img`
  width: 100%;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
`;

const ThumbnailWrapper = styled.li`
  width: 100px;
  position: relative;
  /* padding: 8px; */
  /* border: 1px solid #888; */
  /* border-radius: 4px; */
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  gap: 4px;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1rem;
  padding: 12px;
  border: 0.3px solid #eee;
  border-radius: 4px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8rem;
    padding: 8px;
  }
`;

const CancleBtn = styled(Button)`
  background-color: gray;
  color: white;
`;
const SubmitBtn = styled(Button)`
  background-color: skyblue;
  color: white;
  &:hover {
    background-color: rgb(24, 160, 251);
    transition: 0.3s ease-in-out;
  }
`;

const ErrorInfo = styled.p`
  font-weight: 500;
  font-size: 1rem;
  color: #f77;
  float: right;
  margin-top: 12px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8rem;
  }
`;

export default UploadPost;
