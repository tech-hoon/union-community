import { memo } from 'react';
import { Layouts as S } from './Layouts';
import Eye from 'assets/icons/Eye';

interface Props {
  size?: string;
  count: number;
}

const ViewCount = ({ size, count }: Props) => {
  return (
    <S.Wrapper>
      <Eye color='#666' />
      <S.Count size={size || `13px`}>{count}</S.Count>
    </S.Wrapper>
  );
};

export default memo(ViewCount);
