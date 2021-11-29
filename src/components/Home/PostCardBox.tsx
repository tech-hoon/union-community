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
}

const PostCardBox = ({ posts }: Props) => {
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
            view_count,
            liker_list,
            created_at,
            comment_count,
            attachment_url,
          },
          key
        ) => {
          return (
            <PostCard key={key} onClick={() => handleClick(id!!)}>
              <Category color={categoryColor(category)}>{category}</Category>
              <Head>
                <Title>{title}</Title>
                {!!attachment_url && <ImageIcon />}
              </Head>
              <Content>{tagEliminatingRegex(content).substring(0, 180)}</Content>
              <CardBottom>
                <CreatorBox>
                  <AvatarWrapper>
                    <Avatar avatarId={creator.avatar_id} />
                  </AvatarWrapper>
                  <Creator>{creator.nickname}</Creator>
                </CreatorBox>
                {/* {new Date(created_at).toLocaleDateString()} */}

                <CountBox>
                  <ViewCount count={view_count || 0} />
                  <CommentCount count={comment_count || 0} />
                  <LikeCount count={liker_list.length || 0} />
                </CountBox>
              </CardBottom>
            </PostCard>
          );
        }
      )}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  max-width: 1120px;
  padding: 0 60px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  margin: 40px auto;

  @media ${({ theme }) => theme.size.tablet} {
    grid-template-columns: 1fr 1fr;
    width: 70%;
    padding: 20px;
    padding: 0px;
  }

  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr;
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
  position: relative;

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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 1.3rem;

  display: block;
  text-overflow: ellipsis; /* 말줄임 css */
  white-space: nowrap; /*글자를 한줄로 모아준다*/
  overflow: hidden;
`;

const ImageIcon = styled(PhotoLibrary)`
  width: 24px;
  color: #333;
  margin-right: 8px;
`;
const Content = styled.p`
  font-weight: 300;
  padding-left: 4px;
  padding-bottom: 48px;
  line-height: 1.3em;
  max-height: 100px;
`;

const CardBottom = styled.div`
  width: 88%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0.8rem;
  margin: 0 auto;
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

const Creator = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.color.BLUE};
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
