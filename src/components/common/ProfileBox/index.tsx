import styled from 'styled-components';
import Avatar from './Avatar';
import MypageDropdown from './MypageDropdown';

const ProfileBox = () => {
  return (
    <Wrapper>
      <Name>후니</Name>
      <Avatar />
      <MypageDropdown />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.h3`
  font-family: 'Spoqa Medium';
  font-size: 1.2em;
`;

export default ProfileBox;
