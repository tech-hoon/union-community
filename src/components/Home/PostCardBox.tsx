import { memo } from 'react';
import styled from 'styled-components';
import { PostType } from 'types';
import { useHistory } from 'react-router-dom';
import Avatar from 'components/common/ProfileBox/Avatar';
import CountBox from '../common/CountBox';
import { tagEliminatingRegex } from 'utils/regex';

interface Props {
  posts: PostType[] | [];
}

const PostCardBox = ({ posts }: Props) => {
  const history = useHistory();

  return (
    <Wrapper>
      {posts.map(
        (
          {
            id,
            category,
            title,
            content,
            creator,
            view_count,
            like_count,
            created_at,
            comment_list,
          },
          key
        ) => {
          return (
            <PostCard key={key} onClick={() => history.push(`post/${id}`)}>
              <Title>{title}</Title>
              <Content>{tagEliminatingRegex(content)}</Content>
              <CardBottom>
                <CreatorBox>
                  <AvatarWrapper>
                    <Avatar size='20px' />
                  </AvatarWrapper>
                  <Creator>{creator.displayName}</Creator>
                </CreatorBox>
                {new Date(created_at).toLocaleDateString()}
                <CountBox
                  viewCount={view_count}
                  likeCount={like_count}
                  commentCount={comment_list.length}
                />
              </CardBottom>
            </PostCard>
          );
        }
      )}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  width: 70%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  margin: 40px auto;

  @media ${({ theme }) => theme.size.tablet} {
    grid-template-columns: 1fr 1fr;
    width: 70%;
  }

  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr;
    width: 70%;
  }
`;
const PostCard = styled.li`
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(103%);
  }
`;
const Title = styled.h2`
  font-family: 'Spoqa Bold';
  font-size: 20px;
  margin-bottom: 24px;
`;
const Content = styled.p`
  padding-bottom: 24px;
`;

const CardBottom = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 1rem;
  margin: 0 auto;
`;

const CreatorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AvatarWrapper = styled.div`
  @media ${({ theme }) => theme.size.tablet} {
    display: none;
  }
`;

const Creator = styled.span`
  font-family: 'Spoqa Medium';
  color: ${({ theme }) => theme.color.BLUE};
  font-size: 16px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 14px;
  }
`;

export default memo(PostCardBox);
