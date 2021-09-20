import React from 'react';
import styled from 'styled-components';

interface Props {}

const MenuBox = (props: Props) => {
  return (
    <Wrapper>
      {MENU_LIST.map(({ kor }) => (
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

const MENU_LIST = [
  {
    eng: 'free',
    kor: '자유 ',
  },
  {
    eng: 'advertise',
    kor: '홍보',
  },
  {
    eng: 'club',
    kor: '동아리',
  },
  {
    eng: 'study',
    kor: '스터디',
  },
  {
    eng: 'info',
    kor: '정보',
  },
];
