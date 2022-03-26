import styled from 'styled-components';
import { PriceBox, PriceLabel, PriceTag } from 'components/PostDetail/ProductContainer';
import { ProductPostType } from 'types';
import { categoryColor, productStatusColor, productTypeColor } from 'utils/categoryColor';
import { toDateStringByFormating } from 'utils/date';
import { Layouts as S } from './Layouts';
import StatusLabel from '../PillLabel/StatusLabel';

interface IProps {
  post: ProductPostType;
  onClick: (id: string) => void;
  hideNickname?: boolean;
  lastElemRef: any;
}

const ProductCard = ({ post, onClick, hideNickname, lastElemRef }: IProps) => {
  const {
    id,
    category,
    title,
    content,
    creator,
    created_at,
    visitor_list,
    liker_list,
    comment_count,
    status,
    type,
    price,
    attachment_url,
  } = post;

  return (
    <S.PostCard key={id} onClick={() => onClick(id!!)} ref={lastElemRef}>
      <S.Head>
        <S.Title>{title}</S.Title>
        <S.Category size='sm' isClicked={true} color={categoryColor(category)}>
          {category}
        </S.Category>
      </S.Head>

      <ContentBox>
        <ContentLeft>
          <Content dangerouslySetInnerHTML={{ __html: content }} />
          {price && (
            <StyledPriceBox>
              <StyledPriceLabel>판매가격</StyledPriceLabel>
              <StyledPriceTag>{price}</StyledPriceTag>
            </StyledPriceBox>
          )}
          <StatusBox>
            <StatusLabel color={productTypeColor(type)}>{type}</StatusLabel>
            <StatusLabel color={productStatusColor(status)}>{status}</StatusLabel>
          </StatusBox>
        </ContentLeft>
        <ContentRight>
          <AttachmentImage src={attachment_url[0]} />
        </ContentRight>
      </ContentBox>

      <S.CardBottom>
        <S.CreatorBox>
          <S.AvatarWrapper>
            <S.Avatar avatarId={category === '비밀' ? -1 : creator.avatar_id} />
          </S.AvatarWrapper>
          {!hideNickname && (
            <S.Creator isSecret={category === '비밀'}>
              {category === '비밀' ? '익명' : creator.nickname}
            </S.Creator>
          )}
        </S.CreatorBox>
        <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
        <S.CountBox>
          <S.ViewCount count={visitor_list.length} />
          <S.CommentCount count={comment_count} />
          <S.LikeCount count={liker_list.length} />
        </S.CountBox>
      </S.CardBottom>
    </S.PostCard>
  );
};

const ContentBox = styled.div`
  display: flex;
  margin-bottom: 12px;
  flex: 1;
`;

const Content = styled(S.Content)`
  flex: 1;
  height: 2.4em;
  margin-bottom: 12px;
  line-height: 1.4;
  margin-right: 8px;
  -webkit-line-clamp: 2;
`;

const ContentLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ContentRight = styled.div`
  align-self: flex-end;
`;
const StatusBox = styled.div`
  display: flex;
  gap: 4px;
`;
const AttachmentImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
`;

const StyledPriceBox = styled(PriceBox)`
  margin: 0 0 7px 0;
`;
const StyledPriceLabel = styled(PriceLabel)`
  font-size: 10px;
`;
const StyledPriceTag = styled(PriceTag)`
  font-size: 16px;
`;

export default ProductCard;
