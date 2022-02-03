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
  width: clamp(360px, 30vw, 800px);
`;

export default PeopleAvatar;
