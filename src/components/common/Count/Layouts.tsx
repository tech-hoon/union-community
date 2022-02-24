import styled from 'styled-components';

interface ICount {
  size: string;
}

export const Layouts = {
  Wrapper: styled.div`
    padding: 0 3px;
    display: flex;
    align-items: center;
    gap: 2.4px;
  `,

  Count: styled.span<ICount>`
    font-size: ${({ size }) => size};
    color: #5c5c5c;
  `,
};
