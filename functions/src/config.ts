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
  text: `π‘μλ‘μ΄ μ¬μ©μκ° λ±λ‘λμμ΅λλ€`,
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `π‘ μλ‘μ΄ μ¬μ©μκ° λ±λ‘λμμ΅λλ€:${uid}`,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*μ΄λ¦:*\n${name}`,
        },
        {
          type: 'mrkdwn',
          text: `*μμ΄λ:*\n${uid}`,
        },
        {
          type: 'mrkdwn',
          text: `*μ΄λ©μΌ:*\n${email}`,
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
          text: `*μΈμ¦ μ¬μ§*:${resident_auth_image}`,
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
            text: 'κ±°μ νκΈ°',
          },
          style: 'danger',
          value: 'reject',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'λμνκΈ°',
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
  text: 'π¨μ κ³ κ° μ μλμμ΅λλ€.',
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'π¨ μ κ³ κ° μ μλμμ΅λλ€.',
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
          text: `*μ΄λ¦:*\n${reportee.name}`,
        },
        {
          type: 'mrkdwn',
          text: `*λλ€μ:*\n${reportee.nickname}`,
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
          text: `*μ κ³  μ ν:*\n${type}`,
        },
        {
          type: 'mrkdwn',
          text: `*μ κ³  λ΄μ©:*\n${content}`,
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
          text: `*μ΄λ¦:*\n${reporter.name}`,
        },
        {
          type: 'mrkdwn',
          text: `*λλ€μ:*\n${reporter.nickname}`,
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
