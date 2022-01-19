import styled from 'styled-components';

const Layouts = {
  List: styled.ul`
    position: fixed;
    right: 48px;
    animation: popUpAnimationPC 0.3s ease 0s 1 normal forwards running;

    @media ${({ theme }) => theme.size.mobile} {
      right: 24px;
      animation: popUpAnimationMobile 0.3s ease 0s 1 normal forwards running;
    }

    @keyframes popUpAnimationPC {
      0% {
        opacity: 0;
        bottom: 64px;
      }
      100% {
        opacity: 1;
        bottom: 144px;
      }
    }

    @keyframes popUpAnimationMobile {
      0% {
        opacity: 0;
        bottom: 54px;
      }
      100% {
        opacity: 1;
        bottom: 124px;
      }
    }
  `,

  Menu: styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  `,

  MenuTitle: styled.p`
    flex: 1;
    text-align: right;
    font-size: 18px;
    font-weight: 600;
    color: white;
  `,
};

export default Layouts;
