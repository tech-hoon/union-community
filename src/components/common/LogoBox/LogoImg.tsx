import styled from 'styled-components';
// import { Chat } from '@styled-icons/bootstrap';
import { Chatbubble } from '@styled-icons/ionicons-solid';

const LogoImg = () => {
  return <Img color='#18A0FB' />;
};

const Img = styled(Chatbubble)`
  width: 1.8em;
  margin-right: 4px;
  transform: scaleX(-1);
`;

export default LogoImg;
