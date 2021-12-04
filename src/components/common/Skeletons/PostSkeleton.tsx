import styled from 'styled-components';
import SkeletonBar from './components/SkeletonBar';

interface Props {}

const PostSkeleton = (props: Props) => {
  return (
    <Wrapper>
      <Top />
      <Middle />
      <Content />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1120px;
  padding: 0 60px;
  margin: 3% auto;

  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 95%;
    padding: 0;
  }
`;

const Top = styled(SkeletonBar)`
  height: 40px;
`;
const Middle = styled(SkeletonBar)`
  height: 40px;
`;

const Content = styled(SkeletonBar)`
  height: 320px;
`;

export default PostSkeleton;
