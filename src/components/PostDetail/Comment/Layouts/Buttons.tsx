import styled from 'styled-components';

const S = {
  SideButton: styled.button`
    color: gray;
    padding: 4px 4px;
    font-size: 0.7rem;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.5rem;
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
