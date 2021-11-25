import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import _ = require('lodash');

admin.initializeApp();
const firestore = admin.firestore();

export const postCreated = functions.firestore.document('posts/{postId}').onCreate((doc) => {
  firestore.doc(`counter/posts`).update({
    count: admin.firestore.FieldValue.increment(1),
  });

  firestore.doc(`users/${doc.data().creator.uid}`).update({
    post_list: admin.firestore.FieldValue.arrayUnion(doc.id),
  });
});

export const postDeleted = functions.firestore.document('posts/{postId}').onDelete((doc) => {
  firestore.doc(`counter/posts`).update({
    count: admin.firestore.FieldValue.increment(-1),
  });

  firestore.doc(`users/${doc.data().creator.uid}`).update({
    post_list: admin.firestore.FieldValue.arrayRemove(doc.id),
  });
});

export const postLiked = functions.firestore
  .document('posts/{postId}')
  .onUpdate((change: functions.Change<functions.firestore.QueryDocumentSnapshot>, context) => {
    const liker_list_before = change.before.data().liker_list;
    const liker_list_after = change.after.data().liker_list;
    const postId = change.after.id;

    // liker_list 변경이 없으면 리턴
    if (_.isEqual(liker_list_before, liker_list_after)) {
      functions.logger.log('@ Is Equal');
      return;
    }

    // after - before -> 좋아요
    // before - after -> 좋아요 취소
    const uid_like = liker_list_after.filter((x: string) => !liker_list_before.includes(x))?.[0];
    const uid_unlike =
      !uid_like && liker_list_before.filter((x: string) => !liker_list_before.includes(x))?.[0];

    // user.like_list에 postId 추가
    if (uid_like.length) {
      firestore.doc(`users/${uid_like}`).update({
        like_list: admin.firestore.FieldValue.arrayUnion(postId),
      });
      return;
    }

    // user.like_list에 postId 제거
    firestore.doc(`users/${uid_unlike}`).update({
      like_list: admin.firestore.FieldValue.arrayRemove(postId),
    });
  });

// export const postViewUp = functions.https.onRequest((request:any, response:any)=>{});
