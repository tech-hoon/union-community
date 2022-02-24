import styled from 'styled-components';

const S = {
  SideButton: styled.button`
    color: black;
    padding: 10px 12px;
    font-size: 14px;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 12px;
    }
  `,

  SubmitButton: styled.button`
    font-size: 0.8rem;
    padding: 6px 10px;
    border-radius: 4px;
    color: white;
  `,
};

export const SideButton = (props: any) => <S.SideButton {...props} />;
export const SubmitButton = (props: any) => <S.SubmitButton {...props} />;
