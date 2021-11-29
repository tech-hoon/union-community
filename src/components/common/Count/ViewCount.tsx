import styled from 'styled-components';
import { memo } from 'react';
import { Eye } from '@styled-icons/fa-regular';

interface Props {
  size?: string;
  count: number;
}

const ViewCount = ({ size, count }: Props) => {
  return (
    <Wrapper>
      <Eye size={size || `14px`} color='#888' />
      <Count size={size || `14px`}>{count}</Count>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

interface ICount {
  size: string;
}

const Count = styled.span<ICount>`
  font-size: ${({ size }) => size};
`;

export default memo(ViewCount);
