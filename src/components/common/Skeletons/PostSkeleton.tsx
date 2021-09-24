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
  width: 80vw;
  margin: 8% auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
