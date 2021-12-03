import { forwardRef } from 'react';
import styled from 'styled-components';

interface Props {
  defaultValue?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  errorInfo: string | null;
}

const CustomInput = forwardRef(({ defaultValue, onChange, errorInfo, label }: Props, ref: any) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputWrapper>
        <NicknameInput
          defaultValue={defaultValue}
          onChange={onChange}
          ref={ref}
          errorInfo={errorInfo}
        />
        <InputErrorInfo>{errorInfo}</InputErrorInfo>
      </InputWrapper>
    </Wrapper>
  );
});

interface INicknameInput {
  errorInfo: string | null;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  align-self: flex-start;
  font-weight: 500;
  font-size: 1.3rem;
  padding-top: 9.4px;

  @media ${({ theme }) => theme.size.mobile} {
    padding-top: 5px;
    font-size: 1.2em;
  }
`;

const InputWrapper = styled.div``;

const NicknameInput = styled.input<INicknameInput>`
  width: 100%;
  font-size: 1.5rem;
  padding: 4px 0 4px 8px;
  border: 1px solid ${({ errorInfo }) => (errorInfo ? '#f77' : '#ccc')};
  border-radius: 4px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.3em;
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
  }
`;

const InputErrorInfo = styled.div`
  width: 100%;
  font-size: 0.8rem;
  height: 1rem;
  margin-top: 12px;
  color: #f77;
  text-align: left;
`;

export default CustomInput;
