import { useHistory } from 'react-router';
import styled from 'styled-components';

interface Props {}

const NewPostButton = (props: Props) => {
  const history = useHistory();

  return (
    <Wrapper>
      <Button onClick={() => history.push('/new')}>새 글 쓰기</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Button = styled.button`
  font-weight: 500;
  font-size: 1em;
`;

export default NewPostButton;
