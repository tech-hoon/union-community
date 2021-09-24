import styled from 'styled-components';
import { ChatDots, SuitHeartFill, Eye } from '@styled-icons/bootstrap';
import { PostType } from 'types';
import { useHistory } from 'react-router-dom';
import Avatar from 'components/common/ProfileBox/Avatar';

interface Props {
  posts: PostType[];
}

const PostCardBox = ({ posts }: Props) => {
  const history = useHistory();

  return (
    <Wrapper>
      {posts.map(({ id, name, body }, i) => (
        <PostCard key={i} onClick={() => history.push(`post/${id}`)}>
          <Title>{name}</Title>
          <Content>{body}</Content>
          <CardBottom>
            <CreatorBox>
              <Avatar size='20px' />
              <Creator>홍길동</Creator>
            </CreatorBox>
            <CountSection>
              <CountBox>
                <ChatDots size='14' />
                <Count>4</Count>
              </CountBox>
              <CountBox>
                <Eye size='14' />
                <Count>120</Count>
              </CountBox>
              <CountBox>
                <SuitHeartFill size='14' color='red' />
                <Count>10</Count>
              </CountBox>
            </CountSection>
          </CardBottom>
        </PostCard>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 0 auto;

  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`;
const PostCard = styled.li`
  width: 100%;
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
  width: 80%;
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

const Creator = styled.span`
  font-family: 'Spoqa Medium';
  color: ${({ theme }) => theme.color.BLUE};
  font-size: 16px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 14px;
  }
`;

const CountSection = styled.section`
  display: flex;
  align-items: center;
`;

const CountBox = styled.div`
  padding: 0 2px;
`;
const Count = styled.span`
  font-size: 14px;
  padding: 0 2px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 12px;
  }
`;

export default PostCardBox;
