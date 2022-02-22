import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PRODUCT_STATUS, PRODUCT_TYPE } from 'utils/config';
import { Layouts as S } from './Layouts';

interface ILocationState {
  mode: 'add' | 'update';
  initialProduct?: any;
}

const UploadProduct = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const location = useLocation();
  const { mode, initialProduct } = location.state as ILocationState;

  useEffect(() => {
    // initialProduct?.attachment_url && setAttachment(initialProduct.attachment_url);
  }, []);

  return (
    <>
      <S.Wrapper>
        <S.Navbar />
        <S.Container>
          <S.TitleInput
            ref={titleRef}
            placeholder='물건 이름을 입력하세요'
            defaultValue={initialProduct?.title || ''}
          />
          <S.HR />

          <SelectWrapper>
            <S.SelectBox>
              <S.Label>거래 유형 : </S.Label>
              <TypeSelect
                ref={categoryRef}
                name='거래유형'
                defaultValue={initialProduct?.category || ''}
              >
                <S.Option disabled value=''>
                  거래 유형
                </S.Option>
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
                ref={categoryRef}
                name='카테고리'
                defaultValue={initialProduct?.category || ''}
              >
                {PRODUCT_STATUS.map((status, id) => (
                  <S.Option value={status} key={id}>
                    {status}
                  </S.Option>
                ))}
              </StatusSelect>
            </S.SelectBox>
          </SelectWrapper>

          <S.Editor ref={contentRef} value={initialProduct?.content || null} />
        </S.Container>
      </S.Wrapper>
    </>
  );
};

const SelectWrapper = styled.div`
  display: flex;
  gap: 24px;

  /* @media ${({ theme }) => theme.size.mobile} {
    flex-direction: column;
    gap: 0;
  } */
`;

const TypeSelect = styled(S.Select)`
  width: 100px;
`;

const StatusSelect = styled(S.Select)`
  width: 100px;
`;

export default UploadProduct;
