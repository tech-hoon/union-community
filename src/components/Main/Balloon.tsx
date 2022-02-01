import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

const Balloon = ({ isLoading, children }: Props) => {
  return <Background isLoading={isLoading}>{children}</Background>;
};

export default Balloon;

const Background = styled.h3<{ isLoading: boolean }>`
  width: 90%;
  position: relative;
  background-color: #e0f0fb;
  padding: 26px 10px;
  border-radius: 100px;
  margin-bottom: 20px;

  &:after {
    content: '';
    position: absolute;
    border-top: 20px solid #e0f0fb;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    top: 75px;
    left: 200px;
  }
`;
