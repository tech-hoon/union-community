import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import SlackWebhook = require('@slack/client');
import _ = require('lodash');

// TODO:
// Post 신고 n개 이상시 slack 전송하는 trigger

admin.initializeApp();
const firestore = admin.firestore();
const IncomingWebhook = SlackWebhook.IncomingWebhook;
const config = functions.config();
const slackUrl = config.slack.url;
const Slack = new IncomingWebhook(slackUrl);

export const postCreated = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}')
  .onCreate((snapshot) => {
    firestore.doc(`counter/post`).update({
      count: admin.firestore.FieldValue.increment(1),
    });

    const uid = snapshot.data().creator.id;

    firestore.doc(`users/${uid}`).update({
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

    const uid = snapshot.data().creator.id;

    firestore.doc(`users/${uid}`).update({
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
  .onCreate(async (snapshot, context) => {
    const postId = context.params.postId;
    const post: any = await firestore.doc(`posts/${postId}`).get();

    const postData = post.data();
    const recieverData = await postData.creator.get();
    const recieverId = recieverData.data().uid;

    const { content, creator, parent_comment_id, parent_comment_uid } = snapshot.data();
    const senderData = await creator.get();
    const senderId = senderData.data().uid;

    firestore.doc(`posts/${postId}`).update({
      comment_count: admin.firestore.FieldValue.increment(1),
    });

    const notification = {
      type: 'comment',
      text: content,
      link: `/post/${postId}`,
      sender: firestore.doc(`users/${senderId}`),
      post_title: postData.title,
      created_at: new Date().getTime(),
      is_secret: postData.category === '비밀',
    };

    if (senderId !== recieverId) {
      firestore.doc(`users/${recieverId}`).update({
        notification_list: admin.firestore.FieldValue.arrayUnion(notification),
      });
    }

    if (parent_comment_id && senderId !== parent_comment_uid) {
      firestore.doc(`users/${parent_comment_uid}`).update({
        notification_list: admin.firestore.FieldValue.arrayUnion(notification),
      });
    }
  });

export const commentDeleted = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}/comments/{commentId}')
  .onUpdate((snapshot, context) => {
    const isDeleted = snapshot.after.data().is_deleted;

    if (isDeleted) {
      const postId = context.resource.name.split('/')[6];
      firestore.doc(`posts/${postId}`).update({
        comment_count: admin.firestore.FieldValue.increment(-1),
      });
    }
  });

export const replyCommentDeleted = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}/comments/{commentId}')
  .onDelete((_, context) => {
    const postId = context.params.postId;

    firestore.doc(`posts/${postId}`).update({
      comment_count: admin.firestore.FieldValue.increment(-1),
    });
  });

export const userCreated = functions
  .region('asia-northeast3')
  .firestore.document('users/{userId}')
  .onCreate((snapshot) => {
    firestore.doc(`counter/user`).update({
      count: admin.firestore.FieldValue.increment(1),
    });

    const { email, name, resident_auth_image, uid } = snapshot.data();

    Slack.send({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '💡 새로운 사용자가 등록되었습니다.',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*이름:*\n${name}\n*아이디:*\n${uid}\n*이메일:*\n${email}\n*Firebase*:\nhttps://console.firebase.google.com/u/1/project/univ-dorm-community/firestore/data/~2Fusers~2F${uid}\n*인증 사진*:${resident_auth_image}\n`,
          },
          accessory: {
            type: 'image',
            image_url: resident_auth_image,
            alt_text: 'resident_auth_image',
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              action_id: 'user_auth_approve',
              text: {
                type: 'plain_text',
                emoji: true,
                text: '거절하기',
              },
              style: 'danger',
              value: 'reject',
            },
            {
              type: 'button',
              action_id: 'user_auth_reject',
              text: {
                type: 'plain_text',
                emoji: true,
                text: '동의하기',
              },
              style: 'primary',
              value: 'approve',
            },
          ],
        },
      ],
    });
  });

export const userDeleted = functions
  .region('asia-northeast3')
  .firestore.document('users/{userId}')
  .onDelete(() => {
    firestore.doc(`counter/user`).update({
      count: admin.firestore.FieldValue.increment(-1),
    });
  });
