import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as SlackWebhook from '@slack/client';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { RESIDENT_AUTH_MSG, REPORTED_USER_MSG } from './config';

admin.initializeApp();
const firestore = admin.firestore();
const IncomingWebhook = SlackWebhook.IncomingWebhook;
const config = functions.config();

const residentAuthURL = config.slack.resident_auth_url;
const userReportURL = config.slack.report_user_url;

const SlackResidentAuth = new IncomingWebhook(residentAuthURL);
const SlackUserReport = new IncomingWebhook(userReportURL);

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
    firestore.doc(`counter/post`).update({
      count: admin.firestore.FieldValue.increment(-1),
    });

    const uid = snapshot.data().creator.id;

    firestore.doc(`users/${uid}`).update({
      post_list: admin.firestore.FieldValue.arrayRemove(snapshot.id),
    });
  });

export const commentCreated = functions
  .region('asia-northeast3')
  .firestore.document('posts/{postId}/comments/{commentId}')
  .onCreate(async (snapshot, context) => {
    const postId = context.params.postId;
    const post: any = await firestore.doc(`posts/${postId}`).get();

    const postData = post.data();
    const receiverData = await postData.creator.get();
    const receiverId = receiverData.data().uid;

    const { content, creator, parent_comment_id, parent_comment_uid } = snapshot.data();
    const senderData = await creator.get();
    const senderId = senderData.data().uid;

    const notification = {
      id: uuidv4().slice(0, 8),
      type: 'comment',
      text: content,
      link: `/posts/${postId}`,
      sender: firestore.doc(`users/${senderId}`),
      post_title: postData.title,
      created_at: new Date().getTime(),
      is_secret: postData.category === '비밀',
    };

    // 글쓴이
    if (senderId !== receiverId) {
      firestore.doc(`users/${receiverId}`).update({
        notification_list: admin.firestore.FieldValue.arrayUnion(notification),
      });
    }

    // 부모 댓글
    if (parent_comment_id && senderId !== parent_comment_uid) {
      firestore.doc(`users/${parent_comment_uid}`).update({
        notification_list: admin.firestore.FieldValue.arrayUnion(notification),
      });
    }

    // 부모 댓글의 자식 댓글 작성자들
    if (snapshot.data().receiver_list?.length) {
      functions.logger.log('receiver_list: ', snapshot.data().receiver_list);
      functions.logger.log('senderId: ', senderId);
      functions.logger.log('notification: ', notification);

      const receiverList = snapshot.data().receiver_list;
      receiverList.forEach((receiverId: string) => {
        if (receiverId !== senderId) {
          firestore.doc(`users/${receiverId}`).update({
            notification_list: admin.firestore.FieldValue.arrayUnion(notification),
          });
        }
      });
    }
  });

export const userCreated = functions
  .region('asia-northeast3')
  .firestore.document('users/{userId}')
  .onCreate((snapshot) => {
    firestore.doc(`counter/user`).update({
      count: admin.firestore.FieldValue.increment(1),
    });

    const { email, name, resident_auth_image, uid } = snapshot.data();

    SlackResidentAuth.send(RESIDENT_AUTH_MSG({ email, name, resident_auth_image, uid }));
  });

export const userDeleted = functions
  .region('asia-northeast3')
  .firestore.document('users/{userId}')
  .onDelete(() => {
    firestore.doc(`counter/user`).update({
      count: admin.firestore.FieldValue.increment(-1),
    });
  });

export const userReported = functions
  .region('asia-northeast3')
  .firestore.document('reports/{reportId}')
  .onCreate((snapshot) => {
    const { type, content, reporter, reportee } = snapshot.data();

    SlackUserReport.send(
      REPORTED_USER_MSG({
        id: snapshot.id,
        type,
        content,
        reporter: {
          nickname: reporter.nickname,
          name: reporter.name,
          uid: reporter.uid,
        },
        reportee: {
          nickname: reportee.nickname,
          name: reportee.name,
          uid: reportee.uid,
        },
      })
    );
  });

export const userAuthApproved = functions
  .region('asia-northeast3')
  .https.onRequest((req, res): any => {
    const data = JSON.parse(req.body.payload).message.blocks[0].text.text.split(':');
    const uid = data[data.length - 1];

    firestore.doc(`users/${uid}`).update({ auth_status: 'approved' });

    res.status(200).send({ text: 'user authentication approved' });
  });
