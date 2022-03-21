import PortalContainer from 'components/common/Portal/PortalContainer';
import useLocalStorage from 'hooks/common/useLocalStorage';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  imgSrc: string;
  url?: string;
}

const Popup = ({ imgSrc, url }: IProps) => {
  const [popupOpenedLS, setPopupOpenedLS] = useLocalStorage('new_avatar_popup_opened', true);
  const [popupOpened, setPopupOpened] = useState(true);

  const history = useHistory();

  const onClickPopup = () => {
    url && history.push(url);
  };

  const onClickClose = () => {
    setPopupOpened(false);
  };

  const onClickCloseLS = () => {
    setPopupOpenedLS(false);
  };

  return (
    popupOpened &&
    popupOpenedLS && (
      <PortalContainer onClose={onClickClose} zIndex={2000}>
        <Wrapper>
          <PopupImage src={imgSrc} onClick={onClickPopup} />
          <ButtonBox>
            <Button onClick={onClickCloseLS}>이 팝업 그만 보기</Button>
            <Divider />
            <Button onClick={onClickClose}> 닫기</Button>
          </ButtonBox>
        </Wrapper>
      </PortalContainer>
    )
  );
};

const Wrapper = styled.div``;

const PopupImage = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 12px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  color: white;
  font-size: 16px;
`;

const Divider = styled.span`
  height: auto;
  width: 1px;
  background-color: white;
`;

export default Popup;
