import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import { SNS_LOGIN_STEP, AUTH_WAITING_STEP } from 'utils/config';

export const Layouts = {
  Wrapper: styled.div`
    width: 80vw;
    max-width: 800px;
    height: 600px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    @media ${({ theme }) => theme.size.mobile} {
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      max-height: none;
    }

    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #f8f9fa;
    padding: 10px 16px;
    border-radius: 8px 8px 0 0;
  `,

  Top: styled.div`
    width: 100%;
    height: 80px;
  `,
  BackButton: styled.button<IBackButton>`
    display: ${({ step }) => {
      if (step === SNS_LOGIN_STEP || step === AUTH_WAITING_STEP) return `none`;
    }};
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 32px;
    padding: 20px;
    color: gray;
    margin-right: 90%;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Body: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 1.5rem 0;

    @media ${({ theme }) => theme.size.mobile} {
      margin: 3rem 0;
    }
  `,

  Title: styled.h1`
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 20px;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 1.5rem;
    }
  `,

  Subtitle: styled.h2`
    font-weight: 500;
    font-size: 1.2rem;
    color: #888;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 1rem;
    }
  `,

  ContainerBottom: styled.div`
    position: absolute;
    bottom: 10%;
  `,

  NextButton: styled.button`
    background-color: ${(props) => props.theme.color.MAIN};
    font-weight: 500;
    padding: 6px 16px;
    font-size: 1em;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    color: white;
    cursor: pointer;
    line-height: 1.3rem;

    &:disabled {
      cursor: default;
      background-color: #ccc;
    }
  `,

  CloseBtn: styled(CloseOutline)`
    cursor: pointer;
  `,
};

export default Layouts;

interface IBackButton {
  step: number;
}
