import styled from 'styled-components';
import { MainAvatar1, MainAvatar2, MainAvatar3, MainAvatar4 } from 'assets/images/people';

const PeopleAvatar = () => {
  return (
    <Wrapper>
      <AvatarWrapper>
        <MainAvatar1 />
      </AvatarWrapper>
      <AvatarWrapper>
        <MainAvatar2 />
      </AvatarWrapper>
      <AvatarWrapper>
        <MainAvatar3 />
      </AvatarWrapper>
      <AvatarWrapper>
        <MainAvatar4 />
      </AvatarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const AvatarWrapper = styled.div`
  width: 140px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100px;
  }

  @media (max-width: 500px) {
    width: 92px;
  }

  @media ${({ theme }) => theme.size.mobileS} {
    width: 72px;
  }
`;

export default PeopleAvatar;
