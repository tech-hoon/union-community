import styled from 'styled-components';
import { memo } from 'react';
import Like from 'assets/icons/Like';
import { DebouncedFunc } from 'lodash';
import { Layouts as S } from './Layouts';

interface Props {
  size?: string;
  count: number;
  color?: string;
  onClick?: DebouncedFunc<() => Promise<void>>;
  flag?: 'unlike' | 'like';
}

const LikeCount = ({ size = `13px`, count, color, onClick, flag }: Props) => {
  return (
    <S.Wrapper>
      <Button onClick={onClick}>
        <Like color={flag === 'unlike' ? '#18A0FB' : '#5C5C5C'} />
      </Button>
      <S.Count size={size} color={flag === 'unlike' ? '#18A0FB' : '#5C5C5C'}>
        {count}
      </S.Count>
    </S.Wrapper>
  );
};

const Button = styled.button`
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export default memo(LikeCount);
