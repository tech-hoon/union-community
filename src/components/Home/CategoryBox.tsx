import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { postsCategoryState } from 'store/posts';
import styled from 'styled-components';
import { MENU_LIST } from 'utils/config';

interface Props {}

const CategoryBox = (props: Props) => {
  const [, setCategory] = useRecoilState(postsCategoryState);
  const [clickedMenu, setClickedMenu] = useState<string>();

  const onMenuClick = (value: string) => {
    if (clickedMenu === value) {
      setCategory('');
      setClickedMenu('');
      return;
    }

    setCategory(value);
    setClickedMenu(value);
  };

  return (
    <Wrapper>
      {MENU_LIST.map(({ kor }, id) => (
        <Menu onClick={() => onMenuClick(kor)} key={id} value={kor} isClicked={clickedMenu === kor}>
          {kor}
        </Menu>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  gap: 1%;
  margin: 24px auto 36px;
`;

interface IMenu {
  isClicked: boolean;
}

const Menu = styled.button<IMenu>`
  width: 100%;
  height: 36px;
  border-radius: 20px;
  background-color: ${(props) => (props.isClicked ? props.theme.color.BUTTON_CLICKED : '#fff')};
  color: ${(props) => (props.isClicked ? '#fff' : '#000')};

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

export default CategoryBox;
