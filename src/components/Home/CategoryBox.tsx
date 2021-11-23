import { useRecoilState } from 'recoil';
import { useState, memo } from 'react';
import { postsCategoryState } from 'store/post';
import styled from 'styled-components';
import { CATEGORY_LIST } from 'utils/config';

interface Props {}

const CategoryBox = (props: Props) => {
  const [category, setCategory] = useRecoilState(postsCategoryState);
  const [clickedMenu, setClickedMenu] = useState<string>(category);

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
      {CATEGORY_LIST.map(({ kor }, id) => (
        <Menu onClick={() => onMenuClick(kor)} key={id} value={kor} isClicked={clickedMenu === kor}>
          {kor}
        </Menu>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  box-shadow: 0 0 15px rgb(0 0 0 / 15%);
  margin: 12px auto 24px;

  @media ${({ theme }) => theme.size.mobile} {
    /* margin: 12px auto 24px; */
    font-size: 1em;
    padding: 0px;
  }

  user-select: none;
`;

interface IMenu {
  isClicked: boolean;
}

const Menu = styled.button<IMenu>`
  width: 100%;
  height: 48px;

  background-color: ${(props) => (props.isClicked ? props.theme.color.BUTTON_CLICKED : '#fff')};
  color: ${(props) => (props.isClicked ? '#fff' : '#000')};
  font-size: 1em;
  font-weight: 500;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8em;
  }
`;

export default memo(CategoryBox);
