import { memo } from 'react';
import styled, { css } from 'styled-components';

const RefreshIcon = () => (
  <Wrapper>
    <Circle>
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M26.36 15.875C25.455 21.8887 20.2663 26.5 14 26.5C7.09625 26.5 1.5 20.9037 1.5 14C1.5 7.09625 7.09625 1.5 14 1.5C19.125 1.5 23.5312 4.585 25.46 9'
          stroke='#18A0FB'
          strokeWidth='1.875'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M20.25 9H25.75C25.8485 9 25.946 8.9806 26.037 8.94291C26.128 8.90522 26.2107 8.84997 26.2803 8.78033C26.35 8.71069 26.4052 8.62801 26.4429 8.53701C26.4806 8.44602 26.5 8.34849 26.5 8.25V2.75'
          stroke='#18A0FB'
          strokeWidth='1.875'
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
  color: ${({ theme }) => theme.color.main};
  border: 1px solid ${({ theme }) => theme.color.main};
  background-color: white;
  ${FlexCenter};
`;

export default memo(RefreshIcon);
