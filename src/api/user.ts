import { dbService, firebaseApp } from 'service/firebase';
import { loginUserType } from 'types';

export const getUserData = async (uid: string) => {
  const doc = await dbService.doc(`users/${uid}`).get();
  return doc.data() ? doc.data() : null;
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

export const getMyLikes = async (uid: string) => {
  const res: any = await dbService.doc(`users/${uid}`).get();
  const likeList = res.data().like_list;

  if (!likeList.length) {
    return [];
  }

  const posts = await dbService
    .collection(`posts`)
    .where(firebaseApp.firestore.FieldPath.documentId(), 'in', likeList)
    .get();

  const data = posts.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};
