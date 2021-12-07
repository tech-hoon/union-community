import { memo } from 'react';
import styled from 'styled-components';
import { PostType } from 'types';
import { useHistory } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import { tagEliminatingRegex } from 'utils/regex';
import { categoryColor } from 'utils/categoryColor';
import { PhotoLibrary } from '@styled-icons/material-outlined';
import ViewCount from 'components/common/Count/ViewCount';
import LikeCount from 'components/common/Count/LikeCount';
import CommentCount from 'components/common/Count/CommentCount';

interface Props {
  posts: PostType[] | [];
  mypage?: boolean;
}

const PostCardBox = ({ posts, mypage = false }: Props) => {
  const history = useHistory();

  const handleClick = (id: string) => {
    history.push(`post/${id}`);
  };

  return (
    <Wrapper>
      {posts?.map(
        (
          {
            id,
            category,
            title,
            content,
            creator,
            visitor_list,
            liker_list,
            comment_count,
            attachment_url,
          },
          key
        ) => {
          return (
            <PostCard key={key} onClick={() => handleClick(id!!)}>
              <Head>
                <Title>{title}</Title>
                {!!attachment_url && <ImageIcon size='24px' />}
                <Category color={categoryColor(category)}>{category}</Category>
              </Head>
              <Content>{tagEliminatingRegex(content)}</Content>
              <CardBottom>
                {!mypage && (
                  <CreatorBox>
                    <AvatarWrapper>
                      <Avatar avatarId={category === '비밀' ? -1 : creator.avatar_id} />
                    </AvatarWrapper>
                    <Creator isSecret={category === '비밀'}>
                      {category === '비밀' ? '익명' : creator.nickname}
                    </Creator>
                  </CreatorBox>
                )}
                <CountBox>
                  <ViewCount count={visitor_list.length} />
                  <CommentCount count={comment_count} />
                  <LikeCount count={liker_list.length} />
                </CountBox>
              </CardBottom>
            </PostCard>
          );
        }
      )}
    </Wrapper>
  );
};

const Wrapper = styled.ol`
  max-width: 1120px;
  padding: 0 60px;
  user-select: none;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 32px;
  margin: 40px auto;

  @media ${({ theme }) => theme.size.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    width: 70%;
    padding: 0px;
  }
`;

const PostCard = styled.li`
  height: 300px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.size.desktop} {
    height: 260px;
  }

  @media ${({ theme }) => theme.size.mobile} {
    height: 240px;
  }

  &:hover {
    transform: scale(103%);
  }
`;

const Head = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Title = styled.p`
  flex: 8;
  font-weight: 700;
  font-size: 1.2rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImageIcon = styled(PhotoLibrary)`
  flex: 1;
  color: #333;
  margin-right: 8px;
`;
const Content = styled.p`
  font-weight: 300;
  padding: 0px 4px;
  flex: 1;

  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  white-space: normal;
  line-height: 1.2;
  height: 6rem;
  text-overflow: ellipsis;

  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const CardBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const CreatorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarWrapper = styled.div``;

interface ICreator {
  isSecret: boolean;
}

const Creator = styled.span<ICreator>`
  flex: 1;

  font-weight: 500;
  color: ${({ theme, isSecret }) => (isSecret ? 'gray' : theme.color.MAIN)};
  font-size: 16px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 14px;
  }
`;

interface ICategory {
  color: string;
}

const Category = styled.span<ICategory>`
  background-color: ${(props) => props.color};
  color: #eeeeee;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.9em;
  float: right;
`;

export default memo(PostCardBox);
