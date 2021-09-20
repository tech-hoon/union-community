import { CaretDown } from '@styled-icons/boxicons-regular';
import styled from 'styled-components';
interface Props {}

const MypageDropdown = (props: Props) => {
  return (
    <Wrapper>
      <CaretDown size='20' />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 4px;
  padding-right: 4px;
`;

export default MypageDropdown;
