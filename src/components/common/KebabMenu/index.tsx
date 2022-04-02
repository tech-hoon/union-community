import styled from 'styled-components';
import { useState, useEffect, ReactNode, useCallback } from 'react';
import KebabMenuIcon from '../../../assets/icons/KebabMenuIcon';

interface Props {
  children: ReactNode[];
}

const KebabMenu = ({ children }: Props) => {
  const [toggleOpened, setToggleOpened] = useState(false);

  const onToggleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      setToggleOpened(!toggleOpened);
    },
    [toggleOpened]
  );

  useEffect(() => {
    if (toggleOpened) {
      window.addEventListener('click', onToggleClick);
    }
    return () => window.removeEventListener('click', onToggleClick);
  }, [toggleOpened]);

  return (
    <Wrapper>
      <KebabIcon onClick={onToggleClick}>
        <KebabMenuIcon />
      </KebabIcon>

      {toggleOpened && (
        <DropdownMenuList>
          {children.map((item, i) => (
            <MenuItem key={i}>{item}</MenuItem>
          ))}
        </DropdownMenuList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const KebabIcon = styled.i`
  padding: 8px;
  cursor: pointer;
`;
const DropdownMenuList = styled.ul`
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  top: 40px;
  right: 5px;
`;

const MenuItem = styled.li`
  box-shadow: 0 0 15px 1px rgb(0 0 0 / 5%);
  background-color: ${({ theme }) => theme.color.backgroundColor};
  white-space: nowrap;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #eeeeee;
    }
  }
`;

export default KebabMenu;
