import styled from 'styled-components';

const SkeletonBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(1024px);
    }
  }

  &:before {
    content: '';
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 100%;

    background-color: #e2e5e7;
    background-image: linear-gradient(90deg, rgba(#fff, 0), rgba(#fff, 0.5), rgba(#fff, 0));
    animation: loading 1s infinite ease-in;
  }
`;

export default SkeletonBar;
