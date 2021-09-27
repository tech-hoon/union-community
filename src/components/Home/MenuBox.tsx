import React from 'react';
import styled from 'styled-components';
import { MOCK_MENU_LIST } from 'assets/mockData';

interface Props {}

const MenuBox = (props: Props) => {
  return (
    <Wrapper>
      {MOCK_MENU_LIST.map(({ kor }, id) => (
        <Menu key={id}>{kor}</Menu>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  gap: 1%;
  margin: 24px auto 36px;
`;

const Menu = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  font-size: 1em;
  font-family: 'Spoqa Medium';
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.color.BUTTON_CLICKED};
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8em;
  }
`;

export default MenuBox;
