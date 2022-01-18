import { useRecoilState } from 'recoil';
import { memo, useLayoutEffect, useRef } from 'react';
import { postsCategoryState } from 'store/post';
import styled, { css } from 'styled-components';
import { CATEGORY_LIST } from 'utils/config';
import { categoryColor } from 'utils/categoryColor';
import useLocalStorage from 'hooks/common/useLocalStorage';

interface Props {}

const CategoryBox = (props: Props) => {
  const [category, setCategory] = useRecoilState(postsCategoryState);
  const [scrollX, setScrollX] = useLocalStorage('scrollX', 0);
  const ref = useRef<HTMLDivElement>(null);

  const onMenuClick = (value: string) => {
    setCategory(value);
  };

  useLayoutEffect(() => {
    ref?.current?.scrollTo({ left: scrollX });

    return () => {
      const __scrollX = ref?.current?.scrollLeft;
      setScrollX(__scrollX);
    };
  }, []);

  return (
    <Wrapper ref={ref}>
      {CATEGORY_LIST.map(({ kor }, id) => (
        <Menu onClick={() => onMenuClick(kor)} key={id} value={kor} isClicked={category === kor}>
          {kor}
        </Menu>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1120px;
  padding: 0px 60px;

  display: flex;
  justify-content: space-between;
  margin: 12.5px auto 0;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
    padding: 0;
    font-size: 1em;

    overflow-x: auto;
  }

  user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface IMenu {
  isClicked: boolean;
}

const Menu = styled.button<IMenu>`
  width: 100%;
  height: 40px;
  border-radius: 16px;
  background-color: ${({ isClicked, theme }) => (isClicked ? theme.color.MAIN : '#fff')};
  color: ${(props) => (props.isClicked ? '#fff' : '#000')};

  font-size: 1em;
  font-weight: 500;
  margin: 2px;

  @media ${({ theme }) => theme.size.mobile} {
    height: 36px;
    font-size: 0.9em;
  }

  @media ${({ theme }) => theme.size.mobileS} {
    width: 60px;
    height: 32px;
    font-size: 0.75em;
    flex: 0 0 auto;
  }
`;

export default memo(CategoryBox);
