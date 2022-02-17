import Navbar from 'components/common/Navbar';
import Editor from 'components/common/Editor';
import usePostForm from 'hooks/post/usePostForm';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react';
import { PhotoLibrary } from '@styled-icons/material-outlined';
import { CATEGORY_LIST } from 'utils/config';
import Circle from 'components/common/Loading/Circle';
import DeleteIcon from 'assets/icons/DeleteIcon';
import EmptyImage from 'assets/icons/EmptyImage';

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
    attachments,
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
          <Label>카테고리 : </Label>
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
          <UploadInput
            id='upload-image'
            type='file'
            accept='image/*'
            multiple
            onChange={onFileChange}
          />
        </CategoryBox>

        <Editor ref={contentRef} value={initialPost?.content || null} />

        <ThumbnailsBox>
          {attachments.map((attachmentUrl, id) => (
            <ThumbnailWrapper key={id}>
              <Thumbnail src={attachmentUrl} alt='' />
              <ThumbnailDeleteBtn data-id={id} onClick={onDeleteAttachment}>
                <DeleteIcon />
              </ThumbnailDeleteBtn>
            </ThumbnailWrapper>
          ))}
          <UploadImageBtn htmlFor='upload-image'>
            <EmptyImage />
          </UploadImageBtn>
        </ThumbnailsBox>

        <ButtonBox>
          {!isUploading ? (
            <>
              <CancleBtn type='button' onClick={onEditorCancle}>
                취소하기
              </CancleBtn>
              <SubmitBtn type='submit' disabled={!!errorInfo}>
                등록하기
              </SubmitBtn>
            </>
          ) : (
            <Circle />
          )}
        </ButtonBox>
      </PostContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PostContainer = styled.form`
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => `40px ${theme.container.paddingLeftRight}`};

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
  font-weight: bold;
  font-size: 1rem;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 20px 0;

  @media ${({ theme }) => theme.size.mobile} {
    margin: 16px 0 13px;
  }
`;

const Select = styled.select`
  width: 160px;
  font-size: 13px;
  line-height: 27px;
  padding: 2px 0px;
  border-radius: 5px;
  text-align: center;
`;
const Option = styled.option``;

const UploadImageBtn = styled.label`
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

const ThumbnailsBox = styled.ol`
  width: 100%;
  display: flex;
  gap: 5px;
  margin: 20px 0 47px;
`;

const ThumbnailDeleteBtn = styled.button`
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  color: gray;
`;

const Thumbnail = styled.img`
  width: 100%;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
`;

const ThumbnailWrapper = styled.li`
  width: 100px;
  position: relative;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  gap: 12px;
`;

const Button = styled.button`
  font-weight: 600;
  font-size: 1rem;
  padding: 12px 46px;
  border: 1px solid rgb(24, 160, 251);
  border-radius: 10px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 15px;
    width: 100%;
  }
`;

const CancleBtn = styled(Button)`
  border: 1px solid #b0b0b0;
  color: #b0b0b0;
`;
const SubmitBtn = styled(Button)`
  background-color: rgb(24, 160, 251);
  color: white;

  &:disabled {
    background-color: #b0b0b0;
    border: 1px solid #b0b0b0;
    cursor: not-allowed;
  }
`;

export default UploadPost;
