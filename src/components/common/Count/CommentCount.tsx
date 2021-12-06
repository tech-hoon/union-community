import styled from 'styled-components';
import { memo } from 'react';
import { Chat } from '@styled-icons/bootstrap';

interface Props {
  size?: string;
  count: number;
}

const CommentCount = ({ size, count }: Props) => {
  return (
    <Wrapper>
      <Chat size={size || `14px`} color='#888' />
      <Count size={size || `14px`}>{count}</Count>
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

export default memo(CommentCount);
