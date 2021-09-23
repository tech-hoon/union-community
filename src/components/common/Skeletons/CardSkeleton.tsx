import React from 'react';
import styled from 'styled-components';

interface Props {}

const CardSkeleton = (props: Props) => {
  return (
    <Wrapper>
      {new Array(6).fill('').map((_, i) => (
        <Card key={i}>
          <Bar />
          <Content />
          <Bottom>
            <Circle />
            <Bar />
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
  gap: 20px;
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

const Bar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }

  &:before {
    content: '';
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 90%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: loading 1.5s infinite linear;
  }
`;

const Content = styled(Bar)`
  height: 100px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 12px;
`;
const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }

  &:before {
    content: '';
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: loading 1.5s infinite linear;
  }
`;

export default CardSkeleton;
