import React, { useEffect, useState } from 'react';

interface Props {
  okayCallback?: () => void;
}

const useModal = ({ okayCallback }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [okayClicked, setOkayClicked] = useState(false);
  const onShowModal = () => setModalOpened(true);
  const onCloseModal = () => setModalOpened(false);
  const onClickOkay = () => setOkayClicked(true);

  useEffect(() => {
    if (okayCallback && okayClicked) {
      okayCallback();
    }
  }, [okayClicked]);

  return {
    modalOpened,
    okayClicked,
    onShowModal,
    onCloseModal,
    onClickOkay,
  };
};

export default useModal;
