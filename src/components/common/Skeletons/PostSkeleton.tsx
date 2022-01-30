import styled from 'styled-components';
import SkeletonItem from './components/SkeletonItem';

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
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => `0 ${theme.container.paddingLeftRight}`};

  margin: 3% auto;

  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 90%;
    padding: 0 20px;
  }
`;

const Top = styled(SkeletonItem)`
  height: 40px;
`;
const Middle = styled(SkeletonItem)`
  height: 40px;
`;

const Content = styled(SkeletonItem)`
  height: 320px;
`;

export default PostSkeleton;
