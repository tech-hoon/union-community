import styled from 'styled-components';
import LogoImg from './LogoImg';
import { useHistory } from 'react-router-dom';

interface Props {}

const LogoBox = (props: Props) => {
  const history = useHistory();

  return (
    <Wrapper onClick={() => history.push(`/`)}>
      <LogoImgWrapper>
        <LogoImg />
      </LogoImgWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 3;
`;

const LogoImgWrapper = styled.div`
  cursor: pointer;
`;

// const LogoTitle = styled.h1`
//   display: inline;
//   font-family: 'Spoqa Bold';
//   font-size: 1.5em;
//   line-height: 40px;
//   letter-spacing: -0.04em;

//   @media (max-width: 568px) {
//     font-size: 1.2em;
//   }

//   @media (max-width: 440px) {
//     display: none;
//   }
// `;

export default LogoBox;
