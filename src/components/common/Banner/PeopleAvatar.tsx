import MainAvatar from 'assets/images/people/MainAvatar';
import styled from 'styled-components';

const PeopleAvatar = () => {
  return (
    <Wrapper>
      <MainAvatar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  width: clamp(350px, 50vw, 500px);

  @media ${({ theme }) => theme.size.mobile} {
    width: 350px;
  }
`;

export default PeopleAvatar;
