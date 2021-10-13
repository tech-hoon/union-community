import React from 'react';
import styled from 'styled-components';
import { CaretLeftFill, CaretRightFill } from '@styled-icons/bootstrap';

interface Props {}

const AvatarSelect = (props: Props) => {
  return (
    <Wrapper>
      <PrevBtn />
      <Avatar />
      <NextBtn />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const AvatarBox = styled.div``;
const Avatar = styled.img``;
const Pagination = styled.div``;

const PrevBtn = styled(CaretLeftFill)``;
const NextBtn = styled(CaretRightFill)``;

export default AvatarSelect;
