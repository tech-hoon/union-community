import styled from 'styled-components';
import SkeletonBar from './components/SkeletonBar';

interface Props {}

const CardSkeleton = (props: Props) => {
  return (
    <Wrapper>
      {new Array(6).fill('').map((_, i) => (
        <Card key={i}>
          <Title />
          <Content />
          <Bottom>
            <Circle />
            <Title />
          </Bottom>
        </Card>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  max-width: 1120px;
  padding: 0 60px;
  user-select: none;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 30px;
  margin: 30px auto;

  @media ${({ theme }) => theme.size.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    width: 80%;
    padding: 0px;
  }
`;

const Card = styled.li`
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.size.desktop} {
    height: 15rem;
  }
`;

const Title = styled(SkeletonBar)``;

const Content = styled(SkeletonBar)`
  height: 130px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 12px;
`;

const Circle = styled(SkeletonBar)`
  width: 35px;
  height: 30px;
  border-radius: 50%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
`;

export default CardSkeleton;
