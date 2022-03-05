import useProductForm from 'hooks/product/useProductForm';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PRODUCT_STATUS, PRODUCT_TYPE } from 'utils/config';
import { priceCommaRegex } from 'utils/regex';
import { Layouts as S } from './Layouts';
import PortalContainer from 'components/common/Portal/PortalContainer';
import AlertModal from 'components/common/Portal/AlertModal';

interface ILocationState {
  mode: 'add' | 'update';
  initialProduct?: any;
}

const UploadProduct = () => {
  const location = useLocation();
  const { mode, initialProduct } = location.state as ILocationState;

  const titleRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [type, setType] = useState<string>(initialProduct?.type || '판매');
  const [price, setPrice] = useState<string>(initialProduct?.price || '');

  const handleType = useCallback(
    (e) => {
      setType(e.target.value);
    },
    [type]
  );

  const handlePrice = useCallback(
    (e) => {
      setPrice(priceCommaRegex(e.target.value));
    },
    [price]
  );

  useEffect(() => {
    initialProduct?.attachment_url && setAttachment(initialProduct.attachment_url);
  }, []);

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
  } = useProductForm({
    titleRef,
    statusRef,
    contentRef,
    type,
    price,
    mode,
    prevProduct: initialProduct || null,
  });

  return (
    <>
      <S.Wrapper>
        <S.Navbar />
        <S.Container onSubmit={onSubmit}>
          <S.TitleInput
            ref={titleRef}
            placeholder='물건 이름을 입력하세요'
            defaultValue={initialProduct?.title || ''}
          />
          <S.HR />
          <SelectWrapper>
            <S.SelectBox>
              <S.Label>거래 유형 : </S.Label>
              <TypeSelect onChange={handleType} name='거래유형'>
                {PRODUCT_TYPE.map((type, id) => (
                  <S.Option value={type} key={id}>
                    {type}
                  </S.Option>
                ))}
              </TypeSelect>
            </S.SelectBox>

            <S.SelectBox>
              <S.Label>거래 상태 : </S.Label>
              <StatusSelect
                ref={statusRef}
                name='거래상태'
                defaultValue={initialProduct?.status || '판매중'}
              >
                {PRODUCT_STATUS.map((status, id) => (
                  <S.Option value={status} key={id}>
                    {status}
                  </S.Option>
                ))}
              </StatusSelect>
            </S.SelectBox>
          </SelectWrapper>
          {type === '판매' && (
            <>
              <S.Label>￦</S.Label>
              <S.PriceInput
                type='text'
                defaultValue={initialProduct?.price || ''}
                value={price}
                onChange={handlePrice}
                placeholder='0'
                maxLength={9}
              />
            </>
          )}
          <S.Editor ref={contentRef} value={initialProduct?.content || null} />

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

const SelectWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const TypeSelect = styled(S.Select)`
  width: 100px;
`;

const StatusSelect = styled(S.Select)`
  width: 100px;
`;

export default UploadProduct;
