import { PostType } from 'types';
import { categoryColor } from 'utils/categoryColor';
import { toDateStringByFormating } from 'utils/date';
import { Layouts as S } from './Layouts';

interface IProps {
  post: PostType;
  onClick: (id: string) => void;
  hideNickname?: boolean;
  lastElemRef: any;
}

const PostCard = ({ post, onClick, hideNickname, lastElemRef }: IProps) => {
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
    attachment_url,
  } = post;

  return (
    <S.PostCard key={id} onClick={() => onClick(id!!)} ref={lastElemRef}>
      <S.Head>
        <S.Title>{title}</S.Title>
        {!!attachment_url.length && <S.ImageIcon size='24px' />}
        <S.Category size='sm' isClicked={true} color={categoryColor(category)}>
          {category}
        </S.Category>
      </S.Head>
      <S.Content dangerouslySetInnerHTML={{ __html: content }} />
      <S.CardBottom>
        {hideNickname ? (
          <S.CreatorBox>
            <S.AvatarWrapper>
              <S.Avatar avatarId={-1} />
            </S.AvatarWrapper>
          </S.CreatorBox>
        ) : (
          <S.CreatorBox>
            <S.AvatarWrapper>
              <S.Avatar avatarId={category === '비밀' ? -1 : creator.avatar_id} />
            </S.AvatarWrapper>

            <S.Creator isSecret={category === '비밀'}>
              {category === '비밀' ? '익명' : creator.nickname}
            </S.Creator>
          </S.CreatorBox>
        )}

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

export default PostCard;
