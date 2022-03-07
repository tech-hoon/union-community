import Editor from 'components/common/Editor';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import DeleteIcon from 'assets/icons/DeleteIcon';
import EmptyImage from 'assets/icons/EmptyImage';
import Circle from 'components/common/Loading/Circle';

const Button = styled.button`
  font-weight: 600;
  font-size: 1rem;
  padding: 8px 36px;
  border: 1px solid rgb(24, 160, 251);
  border-radius: 10px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 15px;
    padding: 12px 46px;
    width: 100%;
  }
`;

export const Layouts = {
  Wrapper: styled.div``,
  Navbar: styled(Navbar)``,
  Container: styled.form`
    max-width: ${({ theme }) => theme.container.maxWidth};
    padding: ${({ theme }) => `40px ${theme.container.paddingLeftRight}`};

    margin: 0 auto;

    @media ${({ theme }) => theme.size.mobile} {
      width: 90%;
      padding: 20px 0;
    }
  `,
  TitleInput: styled.input`
    width: 100%;
    font-weight: 700;
    font-size: 29px;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 25px;
    }
  `,
  HR: styled.hr`
    margin: 12px 0;
  `,
  Label: styled.label`
    font-weight: bold;
    font-size: 1rem;
  `,

  Editor: styled(Editor)``,

  Circle: styled(Circle)``,

  SelectBox: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 20px 0;

    @media ${({ theme }) => theme.size.mobile} {
      margin: 16px 0 13px;
    }
  `,

  Select: styled.select`
    width: 160px;
    font-size: 13px;
    line-height: 27px;
    padding: 2px 8px;
    border-radius: 5px;
  `,
  Option: styled.option``,

  PriceBox: styled.div`
    margin: 10px 0;
  `,

  PriceLabel: styled.label`
    font-size: 1.5rem;
    font-weight: bold;
  `,

  PriceInput: styled.input`
    width: 160px;
    font-weight: bold;
    font-size: 1.5rem;

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,

  UploadImageBtn: styled.label`
    flex: none;
    width: 100px;
    height: 100px;

    @media ${({ theme }) => theme.size.mobile} {
      width: 80px;
      height: 80px;
    }
    cursor: pointer;
  `,

  UploadInput: styled.input`
    display: none;
  `,

  ThumbnailsBox: styled.ol`
    width: 100%;
    display: flex;
    gap: 5px;
    margin: 20px 0 47px;
    overflow-x: auto;
    overflow-y: hidden;
  `,

  ThumbnailDeleteBtn: styled.button`
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    color: gray;
  `,

  DeleteIcon: styled(DeleteIcon)``,

  EmptyImage: styled(EmptyImage)``,

  Thumbnail: styled.img`
    height: 100px;

    @media ${({ theme }) => theme.size.mobile} {
      height: 80px;
    }
  `,

  ThumbnailWrapper: styled.li`
    flex: none;
    position: relative;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1.5rem;
    gap: 12px;
  `,

  CancleBtn: styled(Button)`
    border: 1px solid #b0b0b0;
    color: #b0b0b0;
  `,
  SubmitBtn: styled(Button)`
    background-color: rgb(24, 160, 251);
    color: white;

    &:disabled {
      background-color: #b0b0b0;
      border: 1px solid #b0b0b0;
      cursor: not-allowed;
    }
  `,
};
