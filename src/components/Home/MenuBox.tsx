import React from 'react';
import styled from 'styled-components';
import { MOCK_MENU_LIST } from 'assets/mock_data';

interface Props {}

const MenuBox = (props: Props) => {
  return (
    <Wrapper>
      {MOCK_MENU_LIST.map(({ kor }) => (
        <Menu>{kor}</Menu>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  margin: 0 auto;
  gap: 1%;

  margin-top: 3%;
`;

const Menu = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  font-size: 1em;
  font-family: 'Spoqa Light';
  &:hover {
    font-family: 'Spoqa Medium';
    color: white;
    background-color: ${({ theme }) => theme.color.BUTTON_CLICKED};
  }
`;

export default MenuBox;
