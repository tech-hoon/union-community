import styled from 'styled-components';
import SkeletonItem from './components/SkeletonItem';
import { Layouts as S } from 'components/common/PostCardLayout/Layouts';

const PostCardSkeleton = () => {
  return (
    <S.Container>
      {new Array(6).fill('').map((_, i) => (
        <CardSkeleton key={i}>
          <Title />
          <Content>
            {[95, 90, 75, 85, 80].map((width, key) => (
              <Line width={width} key={key} />
            ))}
          </Content>
          <Bottom>
            <Circle />
            <Nickname />
          </Bottom>
        </CardSkeleton>
      ))}
    </S.Container>
  );
};

const CardSkeleton = styled(S.PostCard)`
  cursor: default;
  display: flex;
  justify-content: space-between;
`;

const Title = styled(SkeletonItem)`
  height: 24px;
`;

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 10px;

  @media (min-width: 1440px) {
    gap: 12px;
  }
`;

const Line = styled(SkeletonItem)<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  height: 12px;
  margin-left: 4px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
`;

const Circle = styled(SkeletonItem)`
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
`;

const Nickname = styled(SkeletonItem)`
  width: 100%;
  height: 24px;
`;

export default PostCardSkeleton;
