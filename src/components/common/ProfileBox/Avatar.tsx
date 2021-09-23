import styled from 'styled-components';
import img from 'assets/images/profile-image.png';

interface Props {}

const Avatar = (props: Props) => {
  return (
    <Wrapper>
      <Img src={img} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Img = styled.img`
  padding-top: 2px;
  width: 33px;
`;

export default Avatar;
