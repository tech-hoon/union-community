import styled from 'styled-components';
import peep1 from 'assets/images/people/peep-1.svg';
import peep2 from 'assets/images/people/peep-2.svg';
import peep3 from 'assets/images/people/peep-3.svg';
import peep4 from 'assets/images/people/peep-4.svg';

const PeopleAvatar = () => {
  return (
    <Wrapper>
      <Peep1 src={peep1} />
      <Peep2 src={peep2} />
      <Peep3 src={peep3} />
      <Peep4 src={peep4} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Img = styled.img`
  width: 25%;
`;

const Peep1 = styled(Img)``;
const Peep2 = styled(Img)``;
const Peep3 = styled(Img)``;
const Peep4 = styled(Img)``;

export default PeopleAvatar;
