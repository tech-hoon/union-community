import React from 'react';
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

const Wrapper = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  margin: 0 auto;

  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 240px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled(SkeletonBar)``;

const Content = styled(SkeletonBar)`
  height: 100px;
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
