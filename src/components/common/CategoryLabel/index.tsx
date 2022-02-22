import styled, { css } from 'styled-components';

interface IProps {
  isClicked: boolean;
  color: string;
  size: 'sm' | 'lg';
}

const CategoryLabel = styled.button<IProps>`
  flex: none;

  //Small or Large
  ${({ size }) =>
    size === 'sm'
      ? css`
          text-align: center;
          color: #fff;
          border-radius: 16px;
          padding: 4px 12px;
          font-size: 0.9rem;
        `
      : css`
          font-size: 16px;
          border-radius: 100px;
          padding: 10px 36px;
        `}

  //Click or Non Click
  ${({ isClicked, color }) =>
    isClicked
      ? css`
          color: white;
          font-weight: 550;
          background-color: ${color};
        `
      : css`
          color: black;
          background-color: #fff;
        `}
`;

export default CategoryLabel;
