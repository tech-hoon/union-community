import usePostForm from 'hooks/post/usePostForm';
import { useLocation } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { ADMIN_UID, CATEGORY_LIST } from 'utils/config';

import { Layouts as S } from './Layouts';
import PortalContainer from 'components/common/Portal/PortalContainer';
import AlertModal from 'components/common/Portal/AlertModal';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';
import useRecoilCacheRefresh from 'hooks/comment/useRecoilCacheRefresh';
import { myPostsState } from 'store/myPosts';
import useDebounce from 'hooks/common/useDebounce';
import { universityList } from 'utils/universityList';

interface ILocationState {
  mode: 'add' | 'update';
  initialPost?: any;
}

const UploadPost = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [isUnivCategory, setIsUnivCategory] = useState<boolean>();
  const [, setUnivInput] = useState<string>();

  const [univList, setUnivList] = useState<string[]>();

  const location = useLocation();
  const { mode, initialPost } = location.state as ILocationState;
  const cacheRefresher = useRecoilCacheRefresh(myPostsState);

  const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  const CategoryList = [...CATEGORY_LIST].filter(
    ({ kor }) =>
      (kor !== '전체' && kor !== '공지' && kor !== '장터/나눔') ||
      (kor === '공지' && loginUser.uid === ADMIN_UID)
  );

  const onChangeUnivInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    if (!value) {
      setUnivList([]);
      return;
    }

    setUnivList(universityList.filter((univ) => univ.startsWith(value)));
  };

  const onChangeCategory: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (e.target.value === '대학교') {
      setIsUnivCategory(true);
      return;
    }

    setIsUnivCategory(false);
    setUnivInput('');
  };

  const onDebouncedUnivList = useDebounce(onChangeUnivInput, 500);

  const {
    setAttachment,
    attachments,
    errorInfo,
    onErrorInfoReset,
    onEditorCancle,
    onSubmit,
    onFileChange,
    onDeleteAttachment,
    isUploading,
    hasUploaded,
  } = usePostForm({
    titleRef,
    categoryRef,
    contentRef,
    mode,
    prevPost: initialPost || null,
  });

  useEffect(() => {
    initialPost?.attachment_url && setAttachment(initialPost.attachment_url);
  }, []);

  useEffect(() => {
    if (hasUploaded) {
      cacheRefresher();
    }
  }, [hasUploaded]);

  return (
    <>
      <S.Wrapper>
        <S.Navbar />
        <S.Container onSubmit={onSubmit}>
          <S.TitleInput
            ref={titleRef}
            placeholder='제목을 입력하세요'
            defaultValue={initialPost?.title || ''}
          />
          <S.HR />

          <S.SelectBox>
            <S.Label>카테고리 : </S.Label>
            <S.Select
              ref={categoryRef}
              name='카테고리'
              defaultValue={initialPost?.category || ''}
              onChange={onChangeCategory}
            >
              <S.Option disabled value=''>
                카테고리를 선택해주세요
              </S.Option>
              {CategoryList.map(({ kor }, id) => (
                <S.Option value={kor} key={id}>
                  {kor}
                </S.Option>
              ))}
            </S.Select>
            {isUnivCategory && (
              <S.UnivWrapper>
                <S.UnivInput placeholder={`유니온대학교`} onChange={onDebouncedUnivList} />

                <S.UnivPreviewList>
                  {univList?.map((item, key) => (
                    <S.UnivPreviewItem key={key}>{item}</S.UnivPreviewItem>
                  ))}
                </S.UnivPreviewList>
              </S.UnivWrapper>
            )}
          </S.SelectBox>

          <S.Editor ref={contentRef} value={initialPost?.content || null} />

          <S.UploadInput
            id='upload-image'
            type='file'
            accept='image/*'
            multiple
            onChange={onFileChange}
          />

          <S.ThumbnailsBox>
            {attachments.map((attachmentUrl, id) => (
              <S.ThumbnailWrapper key={id}>
                <S.Thumbnail src={attachmentUrl} alt='' />
                <S.ThumbnailDeleteBtn type='button' data-id={id} onClick={onDeleteAttachment}>
                  <S.DeleteIcon />
                </S.ThumbnailDeleteBtn>
              </S.ThumbnailWrapper>
            ))}
            <S.UploadImageBtn htmlFor='upload-image'>
              <S.EmptyImage />
            </S.UploadImageBtn>
          </S.ThumbnailsBox>

          <S.ButtonBox>
            {!isUploading ? (
              <>
                <S.CancleBtn type='button' onClick={onEditorCancle}>
                  취소하기
                </S.CancleBtn>
                <S.SubmitBtn type='submit'>등록하기</S.SubmitBtn>
              </>
            ) : (
              <S.Circle />
            )}
          </S.ButtonBox>
        </S.Container>
      </S.Wrapper>

      {/* 알림 모달 */}
      {errorInfo && (
        <PortalContainer onClose={onErrorInfoReset}>
          <AlertModal title={errorInfo} onCloseModal={onErrorInfoReset} />
        </PortalContainer>
      )}
    </>
  );
};

export default UploadPost;
