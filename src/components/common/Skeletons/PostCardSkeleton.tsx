import styled from 'styled-components';
import SkeletonItem from './components/SkeletonItem';
import { Layouts as S } from 'components/common/PostCard/Layouts';

interface Props {}

const PostCardSkeleton = (props: Props) => {
  return (
    <S.Wrapper>
      {new Array(6).fill('').map((_, i) => (
        <CardSkeleton key={i}>
          <Title />
          <Content />
          <Bottom>
            <Circle />
            <Title />
          </Bottom>
        </CardSkeleton>
      ))}
    </S.Wrapper>
  );
};

const CardSkeleton = styled(S.PostCard)`
  gap: 20px;
  cursor: default;
`;

const Title = styled(SkeletonItem)``;

const Content = styled(SkeletonItem)`
  height: 130px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 12px;
`;

const Circle = styled(SkeletonItem)`
  width: 35px;
  height: 30px;
  border-radius: 50%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
`;

export default PostCardSkeleton;
