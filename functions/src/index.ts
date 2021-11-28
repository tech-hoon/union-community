import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import SlackWebhook = require('@slack/client');
import _ = require('lodash');

admin.initializeApp();
const firestore = admin.firestore();
const IncomingWebhook = SlackWebhook.IncomingWebhook;
const url = 'SLACK_WEBHOOK_URL';
const Slack = new IncomingWebhook(url);

export const postCreated = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}')
  .onCreate((snapshot) => {
    firestore.doc(`counter/posts`).update({
      count: admin.firestore.FieldValue.increment(1),
    });

    firestore.doc(`users/${snapshot.data().creator.uid}`).update({
      post_list: admin.firestore.FieldValue.arrayUnion(snapshot.id),
    });
  });

export const postDeleted = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}')
  .onDelete((snapshot) => {
    firestore.doc(`counter/posts`).update({
      count: admin.firestore.FieldValue.increment(-1),
    });

    firestore.doc(`users/${snapshot.data().creator.uid}`).update({
      post_list: admin.firestore.FieldValue.arrayRemove(snapshot.id),
    });
  });

export const postLiked = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}')
  .onUpdate((change: functions.Change<functions.firestore.QueryDocumentSnapshot>, context) => {
    const liker_list_before = change.before.data().liker_list;
    const liker_list_after = change.after.data().liker_list;
    const postId = change.after.id;

    // liker_list 변경이 없으면 리턴
    if (_.isEqual(liker_list_before, liker_list_after)) {
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

export const commentCreated = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}/comments/{commentId}')
  .onCreate((_, context) => {
    const postId = context.resource.name.split('/')[6];
    firestore.doc(`posts/${postId}`).update({
      comment_count: admin.firestore.FieldValue.increment(1),
    });
  });

export const commentDeleted = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}/comments/{commentId}')
  .onDelete((_, context) => {
    const postId = context.resource.name.split('/')[6];
    firestore.doc(`posts/${postId}`).update({
      comment_count: admin.firestore.FieldValue.increment(-1),
    });
  });

export const userCreated = functions
  .region('asia-northeast3')
  .firestore.document('users/{userId}')
  .onCreate((snapshot) => {
    const { email, name, resident_auth_image, uid } = snapshot.data();
    Slack.send(
      `
      새로운 사용자가 등록되었습니다.
      
      아이디: ${uid}
      이메일: ${email}
      이름: ${name}
      인증사진: ${resident_auth_image}
      `
    );
  });

// const test =functions.auth.user().onCreate()

// export const postViewUp = functions.https.onRequest((request:any, response:any)=>{});
