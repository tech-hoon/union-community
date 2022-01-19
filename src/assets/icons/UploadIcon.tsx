import { memo } from 'react';
import styled, { css } from 'styled-components';

const UploadIcon = () => (
  <Wrapper>
    <Circle>
      <svg
        width='30'
        height='30'
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1.5 15.5H28.5'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.5 1.5V28.5'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Circle>
  </Wrapper>
);

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 75px;
  height: 75px;
  ${FlexCenter};
`;

const Circle = styled.div`
  cursor: pointer;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #18a0fb;
  ${FlexCenter};
`;

export default memo(UploadIcon);
