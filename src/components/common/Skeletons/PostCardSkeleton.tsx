import styled from 'styled-components';
import SkeletonItem from './components/SkeletonItem';
import { Layouts as S } from 'components/common/PostCard/Layouts';

interface Props {}

const PostCardSkeleton = (props: Props) => {
  return (
    <S.Container>
      {new Array(6).fill('').map((_, i) => (
        <CardSkeleton key={i}>
          <Title />
          <Content>
            {new Array(7).fill('').map((_, i) => (
              <Line key={i} />
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
  height: 28px;
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

const Line = styled(SkeletonItem)`
  height: 12px;
  margin-left: 4px;

  &:nth-child(1) {
    width: 95%;
  }

  &:nth-child(2) {
    width: 90%;
  }
  &:nth-child(3) {
    width: 75%;
  }
  &:nth-child(4) {
    width: 85%;
  }
  &:nth-child(5) {
    width: 80%;
  }

  &:nth-child(6) {
    display: none;
    width: 70%;
  }

  &:nth-child(7) {
    display: none;
    width: 85%;
  }

  @media (min-width: 1441px) {
    &:nth-child(6) {
      display: inline;
    }
    &:nth-child(7) {
      display: inline;
    }
  }
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
