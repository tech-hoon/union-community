import styled from 'styled-components';

export interface IProps {
  onClick?: React.MouseEventHandler;
  screenHeight: number;
}

export const Layouts = {
  Wrapper: styled.section<{ backgroundColor?: string }>`
    height: 100vh;
    background-color: ${({ backgroundColor }) => backgroundColor};
    position: relative;
    flex: none;
    scroll-snap-align: start;
  `,

  Container: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
  `,

  Contents: styled.article``,

  ButtonWrapper: styled.div<{ screenHeight: number }>`
    position: absolute;
    bottom: ${({ screenHeight }) => `${screenHeight * 0.1}px`};

    @media ${({ theme }) => theme.size.tablet} {
      bottom: ${({ screenHeight }) => `${screenHeight * 0.15}px`};
    }
  `,

  ScrollDownButton: styled.button`
    &:before {
      font-size: 3rem;
      color: black;
      content: '⌄';
    }
  `,
};
