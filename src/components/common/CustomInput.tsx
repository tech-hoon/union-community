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
      <InputWrapper>
        <Label>{label}</Label>
        <NicknameInput
          defaultValue={defaultValue}
          onChange={onChange}
          ref={ref}
          errorInfo={errorInfo}
        />
      </InputWrapper>
      <InputErrorInfo>{errorInfo}</InputErrorInfo>
    </Wrapper>
  );
});

interface INicknameInput {
  errorInfo: string | null;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 1px;
`;

const NicknameInput = styled.input<INicknameInput>`
  font-size: 1.2rem;
  padding: 4px 0 4px 8px;
  border: 1px solid ${({ errorInfo }) => (errorInfo ? '#f77' : '#ccc')};
  border-radius: 4px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

const InputErrorInfo = styled.div`
  font-size: 0.8rem;
  height: 1rem;
  color: #f77;
`;

export default CustomInput;
