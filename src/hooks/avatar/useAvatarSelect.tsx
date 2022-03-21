import useDidUpdateEffect from 'hooks/common/useDidUpdateEffect';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';
import { AVATAR_ARRAY_FEMALE, AVATAR_ARRAY_MALE } from 'utils/config';

const useAvatarSelect = () => {
  const user = useRecoilValue(loginUserState) as LoginUserType;
  const [avatarId, setAvatarId] = useState<number>(101);
  const [gender, setGender] = useState('male');
  const [avatarArr, setAvatarArr] = useState(AVATAR_ARRAY_MALE);

  const onAvatarIdNext = () => {
    setAvatarId((prev) => (prev === avatarArr[avatarArr.length - 1] ? avatarArr[0] : prev + 1));
  };

  const onAvatarIdPrev = () => {
    setAvatarId((prev) => (prev === avatarArr[0] ? avatarArr[avatarArr.length - 1] : prev - 1));
  };

  const onClickGender: React.MouseEventHandler<HTMLElement> = (e) => {
    const id = (e.target as HTMLElement).dataset.id as string;
    id && setGender(id);
  };

  useEffect(() => {
    if (user) {
      // male legacy
      if (user.avatar_id >= 1 && user.avatar_id <= 5) {
        setGender('male');
        setAvatarArr(AVATAR_ARRAY_MALE);
        setAvatarId(user.avatar_id + 100);
        return;
      }

      // male
      if (user.avatar_id >= 101 && user.avatar_id <= 199) {
        setGender('male');
        setAvatarId(user.avatar_id);
        setAvatarArr(AVATAR_ARRAY_MALE);
        return;
      }

      // female legacy
      if (user.avatar_id >= 6 && user.avatar_id <= 10) {
        setGender('female');
        setAvatarId(user.avatar_id + 195);
        setAvatarArr(AVATAR_ARRAY_FEMALE);

        return;
      }

      // female
      if (user.avatar_id >= 201 && user.avatar_id <= 299) {
        setGender('female');
        setAvatarId(user.avatar_id);
        setAvatarArr(AVATAR_ARRAY_FEMALE);
        return;
      }
    }
  }, [user]);

  useDidUpdateEffect(() => {
    const arr = gender === 'male' ? AVATAR_ARRAY_MALE : AVATAR_ARRAY_FEMALE;
    setAvatarArr(arr);
    setAvatarId(arr[0]);
  }, [gender]);

  return {
    avatarId,
    gender,
    onAvatarIdNext,
    onAvatarIdPrev,
    onClickGender,
  };
};

export default useAvatarSelect;
