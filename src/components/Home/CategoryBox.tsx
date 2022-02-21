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
        <Menu
          onClick={() => onMenuClick(kor)}
          key={id}
          value={kor}
          isClicked={category === kor}
          categoryColor={categoryColor(kor)}
        >
          {kor}
        </Menu>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => `0 ${theme.container.paddingLeftRight}`};

  display: flex;
  justify-content: space-between;
  margin: 12.5px auto 0;
  gap: 10px;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.size.tablet} {
    overflow-x: auto;
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
    padding: 0 20px;
    overflow-x: auto;
  }
`;

interface IMenu {
  isClicked: boolean;
  categoryColor: string;
}

const Menu = styled.button<IMenu>`
  flex: none;
  font-size: 16px;
  border-radius: 100px;
  padding: 12px 40px;

  ${({ isClicked, categoryColor }) =>
    isClicked
      ? css`
          font-weight: bold;
          color: white;
          background-color: ${categoryColor};
        `
      : css`
          color: black;
          background-color: #fff;
        `}

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 13px;
    padding: 10px 20px;
  }
`;

export default memo(CategoryBox);
