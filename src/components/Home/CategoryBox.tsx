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
  max-width: 1120px;
  padding: 0px 60px 20px;

  display: flex;
  gap: 1%;
  margin: 0px auto 12px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 95%;
    padding: 0;
    margin: 20px auto 28px;
    font-size: 1em;
  }

  user-select: none;
`;

interface IMenu {
  isClicked: boolean;
}

const Menu = styled.button<IMenu>`
  width: 100%;
  height: 36px;
  border-radius: 16px;
  background-color: ${(props) => (props.isClicked ? props.theme.color.MAIN : '#fff')};
  color: ${(props) => (props.isClicked ? '#fff' : '#000')};

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  font-size: 1em;
  font-weight: 500;
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.color.MAIN};
  }
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8em;
  }
`;

export default memo(CategoryBox);
