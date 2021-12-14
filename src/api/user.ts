import { dbService, firebaseApp } from 'service/firebase';
import { UserType } from 'types';

export const getUserData = async (uid: string | UserType) => {
  const doc = await dbService.doc(`users/${uid}`).get();
  return doc.data() ? doc.data() : null;
};

export const addUser = ({ uid, ...rest }: any) => {
  try {
    dbService
      .collection('users')
      .doc(uid)
      .set(
        {
          uid,
          ...rest,
        },
        { merge: true }
      );
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserData = async (uid: string) => {
  try {
    await dbService.doc(`users/${uid}`).delete();
  } catch (error) {
    console.log(error);
  }
};

interface IupdateProfile {
  uid: string;
  avatar_id: number;
  nickname: string;
}

export const updateProfile = async ({ uid, avatar_id, nickname }: IupdateProfile) => {
  try {
    dbService.collection('users').doc(uid).update({
      uid,
      avatar_id,
      nickname,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyNickname = async (nickname: string) => {
  try {
    const res = await dbService.collection('users').where('nickname', '==', nickname).get();
    const data = res.docs.map((doc) => doc.data());

    return data?.length ? false : true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getMyLikes = async (uid: string) => {
  const res: any = await dbService.doc(`users/${uid}`).get();
  const likeList = res.data().like_list;

  if (!likeList.length) {
    return [];
  }

  const batches = [];
  while (likeList.length) {
    const batch = likeList.splice(0, 10);

    const posts = await dbService
      .collection(`posts`)
      .where(firebaseApp.firestore.FieldPath.documentId(), 'in', batch)
      .get();

    const data = posts.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    batches.push(...data);
  }

  return batches.sort((a, b) => b.created_at - a.created_at);
};

export const getMyPosts = async (uid: string) => {
  const res: any = await dbService.doc(`users/${uid}`).get();
  const myPosts = res.data().post_list;

  if (!myPosts.length) {
    return [];
  }

  const batches = [];
  while (myPosts.length) {
    const batch = myPosts.splice(0, 10);

    const posts = await dbService
      .collection(`posts`)
      .where(firebaseApp.firestore.FieldPath.documentId(), 'in', batch)
      .get();

    const data = posts.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    batches.push(...data);
  }

  return batches.sort((a, b) => b.created_at - a.created_at);
};
