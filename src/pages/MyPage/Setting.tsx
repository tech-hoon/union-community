import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { SettingsOutline } from '@styled-icons/evaicons-outline';

const Setting = () => {
  return (
    <S.Wrapper>
      <S.Navbar isLoggedIn={true} />
      <S.Container>
        <S.Title>
          <SettingsOutline size='30px' />
          설정
        </S.Title>
      </S.Container>
    </S.Wrapper>
  );
};

const Wrapper = styled.div``;

export default Setting;
