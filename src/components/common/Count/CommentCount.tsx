import { memo } from 'react';
import Comment from 'assets/icons/Comment';
import { Layouts as S } from './Layouts';

interface Props {
  size?: string;
  count: number;
}

const CommentCount = ({ size, count }: Props) => {
  return (
    <S.Wrapper>
      <Comment width='17' height='14' />
      <S.Count size={size || `13px`}>{count}</S.Count>
    </S.Wrapper>
  );
};

export default memo(CommentCount);
