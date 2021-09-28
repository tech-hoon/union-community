import styled from 'styled-components';
import img from 'assets/images/avatar/profile-image.png';
import React from 'react';

interface Props {
  size?: string;
}

const Avatar = ({ size }: Props) => {
  return (
    <Wrapper>
      <Img src={img} sizes={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Img = styled.img`
  padding-top: 2px;
  width: ${({ sizes }) => sizes || `33px`};
`;

export default React.memo(Avatar);
