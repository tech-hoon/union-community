import styled from 'styled-components';
import SkeletonItem from './components/SkeletonItem';

const PostSkeleton = () => {
  return (
    <Wrapper>
      <Container>
        <Category />
        <Title />
        <Profile>
          <Avatar />
          <Nickname />
        </Profile>
        <Content>
          {[90, 80, 70, 85, 75, 65].map((width, key) => (
            <Line width={width} key={key} />
          ))}
        </Content>
        <ImageBox>
          <Image />
          <Image />
        </ImageBox>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.section`
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => `0 ${theme.container.paddingLeftRight}`};

  margin: 3% auto;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
    margin: 6% auto;
    padding: 0 20px;
  }

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Category = styled(SkeletonItem)`
  height: 30px;
  width: 80px;
  border-radius: 20px;
`;
const Title = styled(SkeletonItem)`
  height: 30px;
  width: 60%;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled(SkeletonItem)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Nickname = styled(SkeletonItem)`
  width: 120px;
  height: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Line = styled(SkeletonItem)<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  height: 18px;

  @media ${({ theme }) => theme.size.mobile} {
    &:nth-child(n + 5) {
      display: none;
    }
  }
`;

const ImageBox = styled.div`
  display: flex;
  gap: 16px;
`;

const Image = styled(SkeletonItem)`
  width: 200px;
  height: 160px;

  @media ${({ theme }) => theme.size.mobile} {
    &:nth-child(1) {
      display: none;
    }
  }
`;

export default PostSkeleton;
