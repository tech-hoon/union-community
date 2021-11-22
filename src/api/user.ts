import { dbService } from 'service/firebase';
import { loginUserType } from 'types';

export const getUserData = async (uid: string) => {
  const userDB = await dbService.doc(`users/${uid}`).get();
  return userDB.data() ? userDB.data() : null;
};

export const addUser = ({ uid, ...rest }: loginUserType) => {
  try {
    dbService
      .collection('users')
      .doc(uid)
      .set({
        uid,
        ...rest,
      });
  } catch (error) {
    console.log(error);
  }
};
