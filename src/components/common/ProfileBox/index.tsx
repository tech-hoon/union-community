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

  cursor: pointer;
`;

const Name = styled.h3`
  font-family: 'Spoqa Bold';
  font-size: 1em;
`;

export default ProfileBox;
