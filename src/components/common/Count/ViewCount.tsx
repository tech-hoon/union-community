import styled from 'styled-components';
import { memo } from 'react';
import Eye from 'assets/icons/Eye';

interface Props {
  size?: string;
  count: number;
}

const ViewCount = ({ size, count }: Props) => {
  return (
    <Wrapper>
      <Eye color='#666' />
      <Count size={size || `13px`}>{count}</Count>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 3px;
`;

interface ICount {
  size: string;
}

const Count = styled.span<ICount>`
  font-size: ${({ size }) => size};
  color: #666;
`;

export default memo(ViewCount);
