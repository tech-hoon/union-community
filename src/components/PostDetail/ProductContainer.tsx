import React from 'react';
import styled from 'styled-components';
import { PostType, ProductPostType } from 'types';
import Avatar from 'components/common/Avatar';
import { toDateStringByFormating } from 'utils/date';
import CategoryLabel from 'components/common/PillLabel/CategoryLabel';
import KebabMenu from 'components/common/KebabMenu';
import { PhotoLibrary } from '@styled-icons/material-outlined';
import { categoryColor, productStatusColor, productTypeColor } from 'utils/categoryColor';

interface IProps {
  post: ProductPostType;
  contentMarkup: { __html: string };
  isCreator: boolean;

  onOpenModal: () => void;
  onOpenUserMenu: () => void;
  onOpenImageSlider: (id: number) => void;
  onUpdateProductClick: () => void;
}
const ProductContainer = ({
  post,
  isCreator,
  contentMarkup,
  onOpenModal,
  onOpenUserMenu,
  onOpenImageSlider,
  onUpdateProductClick,
}: IProps) => {
  const { category, title, creator, created_at, attachment_url, status, type, price } = post;

  return (
    <Wrapper>
      <CategoryBox>
        <Category size='sm' color={productTypeColor(type)} isClicked={true}>
          {type}
        </Category>
        <Category size='sm' color={productStatusColor(status)} isClicked={true}>
          {status}
        </Category>
      </CategoryBox>

      <ROW_1>
        <Title>{title}</Title>
      </ROW_1>
      <ROW_2>
        <ProfileBox onClick={onOpenUserMenu}>
          <Avatar avatarId={creator.avatar_id} />
          <Creator>{creator.nickname}</Creator>
        </ProfileBox>
        <CreatedAt>{toDateStringByFormating(created_at, false, '.')}</CreatedAt>

        {isCreator && (
          <KebabMenu>
            <UpdateBtn onClick={onUpdateProductClick}>수정하기</UpdateBtn>
            <DeleteBtn onClick={onOpenModal}>삭제하기</DeleteBtn>
          </KebabMenu>
        )}
      </ROW_2>
      <ContentWrapper>
        <Content dangerouslySetInnerHTML={contentMarkup} />

        {!!price && (
          <PriceBox>
            <PriceLabel>판매 가격</PriceLabel>
            <PriceTag>{price}</PriceTag>
          </PriceBox>
        )}

        <ImagesContainer>
          {(attachment_url || []).map((url, id) => (
            <ImageWrapper status={status} key={id}>
              <ImageText status={status}>판매 완료</ImageText>
              <Image src={url} alt='image' onClick={() => onOpenImageSlider(id)} />
            </ImageWrapper>
          ))}
        </ImagesContainer>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CategoryBox = styled.div``;

const ROW_1 = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin: 18px 0;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1;
  flex: 8;
  word-break: break-all;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.5rem;
  }
`;

const ROW_2 = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8em;
  }
`;

const ROW_3 = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3em;
  margin-top: 16px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Creator = styled.span`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 1.2px;
  color: ${({ theme }) => theme.color.main};
  user-select: none;
`;

const Btn = styled.button`
  font-size: 14px;
  font-weight: 400;
  color: black;
  padding: 12px 14px;
`;

const UpdateBtn = styled(Btn)``;

const DeleteBtn = styled(Btn)``;

const CreatedAt = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #999;
  margin-right: auto;
  padding-right: 1.2px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 10px;
  }
`;

const IsEdited = styled(CreatedAt)`
  line-height: 1.5;
  font-size: 0.8rem;
  align-self: flex-end;
`;

const ContentWrapper = styled.section`
  min-height: 20vh;
  margin: 26px 0 36px;
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  white-space: pre-line;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

export const PriceBox = styled.div`
  margin-top: 30px;
`;
export const PriceLabel = styled.span`
  font-size: 15px;
  color: #5c5c5c;
  font-weight: 400;

  &:after {
    content: ' | ';
  }
`;
export const PriceTag = styled.span`
  font-size: 20px;
  font-weight: bold;

  &:after {
    content: '원';
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const ImageWrapper = styled.div<{ status: string }>`
  & > *:not(div) {
    filter: ${({ status }) => status === '판매완료' && 'brightness(50%)'};
  }
  position: relative;
`;

const Image = styled.img`
  flex: none;
  height: 150px;
  margin-top: 30px;
  margin-bottom: 24px;
  cursor: pointer;
  -webkit-user-drag: none;
`;

const ImageText = styled.div<{ status: string }>`
  &:nth-child(1) {
    display: ${({ status }) => (status === '판매완료' ? 'block' : 'none')};
  }
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  color: white;
  z-index: 3;
`;

const Category = styled(CategoryLabel)`
  font-weight: 500;
  &:nth-child(1) {
    margin-right: 5px;
  }
  cursor: default;
`;

export default ProductContainer;
