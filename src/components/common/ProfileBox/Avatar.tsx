import styled from 'styled-components';
import img from 'assets/images/profile-image.png';

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

export default Avatar;
