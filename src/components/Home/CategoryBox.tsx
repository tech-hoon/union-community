import { useRecoilState } from 'recoil';
import { memo, useLayoutEffect, useRef } from 'react';
import { postsCategoryState } from 'store/post';
import styled from 'styled-components';
import { CATEGORY_LIST } from 'utils/config';
import { categoryColor } from 'utils/categoryColor';
import useLocalStorage from 'hooks/common/useLocalStorage';
import CategoryLabel from 'components/common/PillLabel/CategoryLabel';

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
        <Category
          size='lg'
          onClick={() => onMenuClick(kor)}
          key={id}
          value={kor}
          isClicked={category === kor}
          color={categoryColor(kor)}
        >
          {kor}
        </Category>
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
    padding: 0;
    overflow-x: auto;
    /* margin: 12.5px 0px 0px 20px; */
    margin: 12.5px 0px 0px 0px;
  }
`;

const Category = styled(CategoryLabel)`
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 13px;
    padding: 10px 20px;
    &:nth-child(1) {
      margin-left: 20px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(105%);
      transition: 0.3s;
    }
  }
`;

export default memo(CategoryBox);
