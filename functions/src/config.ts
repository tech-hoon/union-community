import * as SlackWebhook from '@slack/client';

interface IResidentAuthMsg {
  name: string;
  uid: string;
  email: string;
  resident_auth_image: string;
}

interface IReportedUserMsg {
  id: string;
  type: string;
  content: string;

  reporter: {
    uid: string;
    nickname: string;
    name: string;
  };
  reportee: {
    uid: string;
    nickname: string;
    name: string;
  };
}

export const RESIDENT_AUTH_MSG = ({
  name,
  uid,
  email,
  resident_auth_image,
}: IResidentAuthMsg): SlackWebhook.IncomingWebhookSendArguments => ({
  text: `💡새로운 사용자가 등록되었습니다`,
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `💡 새로운 사용자가 등록되었습니다:${uid}`,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*이름:*\n${name}`,
        },
        {
          type: 'mrkdwn',
          text: `*아이디:*\n${uid}`,
        },
        {
          type: 'mrkdwn',
          text: `*이메일:*\n${email}`,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Firebase*:\nhttps://console.firebase.google.com/u/0/project/univ-dorm-community/firestore/data/~2Fusers~2F${uid}`,
        },
        {
          type: 'mrkdwn',
          text: `*인증 사진*:${resident_auth_image}`,
        },
      ],
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '거절하기',
          },
          style: 'danger',
          value: 'reject',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '동의하기',
          },
          style: 'primary',
          value: 'approve',
        },
      ],
    },
  ],
});

export const REPORTED_USER_MSG = ({
  id,
  type,
  content,

  reporter,
  reportee,
}: IReportedUserMsg): SlackWebhook.IncomingWebhookSendArguments => ({
  text: '🚨신고가 접수되었습니다.',
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🚨 신고가 접수되었습니다.',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '_Reportee_',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*이름:*\n${reportee.name}`,
        },
        {
          type: 'mrkdwn',
          text: `*닉네임:*\n${reportee.nickname}`,
        },
        {
          type: 'mrkdwn',
          text: `*UID:*\n${reportee.uid}`,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '_Report Content_',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*신고 유형:*\n${type}`,
        },
        {
          type: 'mrkdwn',
          text: `*신고 내용:*\n${content}`,
        },
      ],
    },

    {
      type: 'divider',
    },

    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '_Reporter_',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*이름:*\n${reporter.name}`,
        },
        {
          type: 'mrkdwn',
          text: `*닉네임:*\n${reporter.nickname}`,
        },
        {
          type: 'mrkdwn',
          text: `*UID:*\n${reporter.uid}`,
        },
      ],
    },
    {
      type: 'divider',
    },
  ],
});
