import styled from 'styled-components';

interface IProps {
  color: string;
}

const StatusLabel = styled.button<IProps>`
  flex: none;
  font-size: 10px;
  padding: 3px 14px;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  border-radius: 100px;
`;

export default StatusLabel;
