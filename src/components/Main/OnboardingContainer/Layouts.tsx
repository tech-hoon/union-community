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
    align-items: center;
    justify-content: space-evenly;

    @media ${({ theme }) => theme.size.mobile} {
      flex-direction: column;
      justify-content: center;
      gap: 5%;
    }

    margin: auto;
  `,

  Contents: styled.article`
    flex: none;
    font-size: 20px;
    white-space: pre-line;
    line-height: 32px;
    font-weight: 300;

    & strong {
      font-weight: 500;
      color: ${({ theme }) => theme.color.main};
    }

    & b {
      font-weight: 400;
    }
  `,

  ImageWrapper: styled.div`
    flex: none;

    width: 283px;
    height: 534px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    border-radius: 50px;
  `,

  Image: styled.img``,

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
